import type { RedisClient } from '../redis-client.js';
import type {
  RateLimitConfig,
  RateLimitResult,
  RateLimitStrategy,
} from './types.js';

export class LeakyBucketStrategy implements RateLimitStrategy {
  private readonly luaScript: string;

  constructor(
    private readonly redis: RedisClient,
    private readonly defaultCapacity: number,
    private readonly defaultLeakRate: number
  ) {
    this.luaScript = `
      local key = KEYS[1]
      local capacity = tonumber(ARGV[1])
      local leakRate = tonumber(ARGV[2])
      local now = tonumber(ARGV[3])
      local consume = tonumber(ARGV[4])
      local ttl = tonumber(ARGV[5])
      
      local data = redis.call('GET', key)
      local level, lastLeak
      
      if not data then
        level = 0
        lastLeak = now
      else
        local parsed = cjson.decode(data)
        level = tonumber(parsed.level)
        lastLeak = tonumber(parsed.lastLeak)
      end
      
      local elapsed = (now - lastLeak) / 1000
      local leaked = elapsed * leakRate
      level = math.max(0, level - leaked)
      lastLeak = now
      
      local allowed = 0
      local remaining = capacity - level
      
      if level + consume <= capacity then
        level = level + consume
        allowed = 1
        remaining = capacity - level
      else
        remaining = 0
      end
      
      local reset = now
      if leakRate > 0 and level > 0 then
        reset = now + math.ceil((level / leakRate) * 1000)
      else
        reset = now + (ttl / 2)
      end
      
      local result = cjson.encode({
        level = level,
        lastLeak = lastLeak
      })
      
      redis.call('SET', key, result, 'PX', ttl)
      
      return cjson.encode({
        allowed = allowed,
        remaining = math.floor(remaining),
        reset = reset,
        limit = capacity
      })
    `;
  }

  private key(serviceId: string, id: string): string {
    return `rate_limit:leaky_bucket:${serviceId}:${id}`;
  }

  async check(
    serviceId: string,
    id: string,
    config?: RateLimitConfig
  ): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const capacity = config?.capacity ?? this.defaultCapacity;
      const leakRate = config?.leakRate ?? this.defaultLeakRate;
      const key = this.key(serviceId, id);
      const ttl = 60 * 60 * 1000;

      const resultStr = await this.redis.eval(
        this.luaScript,
        [key],
        [
          capacity.toString(),
          leakRate.toString(),
          now.toString(),
          '1',
          ttl.toString(),
        ]
      );

      if (typeof resultStr === 'string') {
        try {
          const parsed = JSON.parse(resultStr) as {
            allowed: boolean | number;
            remaining: number;
            reset: number;
            limit: number;
          };
          const allowed =
            typeof parsed.allowed === 'boolean'
              ? parsed.allowed
              : parsed.allowed === 1;
          return {
            allowed,
            remaining: Number(parsed.remaining) || 0,
            reset: Number(parsed.reset) || now + 60000,
            limit: Number(parsed.limit) || capacity,
          };
        } catch {}
      }

      return {
        allowed: false,
        remaining: 0,
        reset: now + 60000,
        limit: capacity,
      };
    } catch {
      return {
        allowed: true,
        remaining: Math.max(0, (config?.capacity ?? this.defaultCapacity) - 1),
        reset: Date.now() + 60000,
        limit: config?.capacity ?? this.defaultCapacity,
      };
    }
  }
}
