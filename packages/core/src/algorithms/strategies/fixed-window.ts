import type {
  RateLimitConfig,
  RateLimitResult,
  RateLimitStrategy,
} from './types.js';
import { redisClient } from '../../config/redis.js';

export class FixedWindowStrategy implements RateLimitStrategy {
  private readonly luaScript: string;

  constructor(
    private readonly redis: typeof redisClient,
    private readonly defaultLimit: number,
    private readonly defaultWindowSize: number
  ) {
    this.luaScript = `
      local key = KEYS[1]
      local limit = tonumber(ARGV[1])
      local windowSize = tonumber(ARGV[2])
      local now = tonumber(ARGV[3])
      local ttl = tonumber(ARGV[4])
      
      local windowStart = math.floor(now / windowSize) * windowSize
      local windowKey = key .. ':' .. windowStart
      
      local current = tonumber(redis.call('GET', windowKey) or '0')
      
      local allowed = 0
      local remaining = 0
      
      if current < limit then
        redis.call('INCR', windowKey)
        redis.call('EXPIRE', windowKey, math.ceil(ttl / 1000))
        allowed = 1
        remaining = limit - current - 1
      else
        remaining = 0
      end
      
      local reset = windowStart + windowSize
      
      return cjson.encode({
        allowed = allowed,
        remaining = remaining,
        reset = reset,
        limit = limit
      })
    `;
  }

  private key(serviceId: string, id: string): string {
    return `rate_limit:fixed_window:${serviceId}:${id}`;
  }

  async check(
    serviceId: string,
    id: string,
    config?: RateLimitConfig
  ): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const limit = config?.limit ?? this.defaultLimit;
      const windowSize = config?.windowSize ?? this.defaultWindowSize;
      const key = this.key(serviceId, id);
      const ttl = 60 * 60 * 1000;

      const resultStr = await this.redis.eval(
        this.luaScript,
        [key],
        [
          limit.toString(),
          windowSize.toString(),
          now.toString(),
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
            reset: Number(parsed.reset) || now + windowSize,
            limit: Number(parsed.limit) || limit,
          };
        } catch {}
      }

      return {
        allowed: false,
        remaining: 0,
        reset: now + windowSize,
        limit,
      } as const;
    } catch {
      return {
        allowed: true,
        remaining: Math.max(0, (config?.limit ?? this.defaultLimit) - 1),
        reset: Date.now() + (config?.windowSize ?? this.defaultWindowSize),
        limit: config?.limit ?? this.defaultLimit,
      } as const;
    }
  }
}
