import { redisClient } from '../config/redis';

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  readonly allowed: boolean;
  /** Remaining requests */
  readonly remaining: number;
  /** Unix timestamp in milliseconds when the limit resets */
  readonly reset: number;
  /** Total rate limit */
  readonly limit: number;
}

/**
 * Rate limit configuration options
 */
export interface RateLimitConfig {
  /** Override default capacity (tokens) */
  readonly capacity?: number;
  /** Override default refill rate (tokens per second) */
  readonly refillRate?: number;
}

/**
 * Rate limiter using token bucket algorithm with Redis
 */
class RateLimiter {
  private readonly luaScript: string;

  constructor(
    private readonly redis: typeof redisClient,
    private readonly capacity: number,
    private readonly refillRate: number
  ) {
    if (capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    if (refillRate < 0) {
      throw new Error('Refill rate must be non-negative');
    }

    this.luaScript = `
      local key = KEYS[1]
      local capacity = tonumber(ARGV[1])
      local refillRate = tonumber(ARGV[2])
      local now = tonumber(ARGV[3])
      local consume = tonumber(ARGV[4])
      local ttl = tonumber(ARGV[5])
      
      local data = redis.call('GET', key)
      local tokens, lastRefill
      
      if not data then
        tokens = capacity
        lastRefill = now
      else
        local parsed = cjson.decode(data)
        tokens = tonumber(parsed.tokens)
        lastRefill = tonumber(parsed.lastRefill)
      end
      
      local elapsed = (now - lastRefill) / 1000
      local refill = elapsed * refillRate
      tokens = math.min(capacity, tokens + refill)
      
      local allowed = 0
      local remaining = math.floor(tokens)
      if tokens >= consume then
        tokens = tokens - consume
        allowed = 1
        remaining = math.floor(tokens)
      end
      
      local reset = now
      if refillRate > 0 then
        reset = lastRefill + math.ceil((capacity - tokens) / refillRate * 1000)
      else
        reset = now + (ttl / 2)
      end
      
      local result = cjson.encode({
        tokens = tokens,
        lastRefill = now
      })
      
      redis.call('SET', key, result, 'PX', ttl)
      
      return cjson.encode({
        allowed = allowed,
        remaining = remaining,
        reset = reset,
        limit = capacity
      })
    `;
  }

  private key(serviceId: string, id: string): string {
    return `rate_limit:${serviceId}:${id}`;
  }

  /**
   * Check rate limit and return detailed result
   * 
   * @param serviceId - Service identifier for isolation
   * @param id - Client identifier
   * @param config - Optional rate limit configuration
   * @returns Rate limit result with allowed status and metadata
   */
  async check(
    serviceId: string,
    id: string,
    config?: RateLimitConfig
  ): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const capacity = config?.capacity ?? this.capacity;
      const refillRate = config?.refillRate ?? this.refillRate;
      const key = this.key(serviceId, id);
      const ttl = 60 * 60 * 1000;

      const resultStr = await this.redis.eval(
        this.luaScript,
        [key],
        [
          capacity.toString(),
          refillRate.toString(),
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
          const allowed = typeof parsed.allowed === 'boolean' 
            ? parsed.allowed 
            : parsed.allowed === 1;
          return {
            allowed,
            remaining: Number(parsed.remaining) || 0,
            reset: Number(parsed.reset) || now + 60000,
            limit: Number(parsed.limit) || capacity,
          };
        } catch {
          // Fall through to default error case
        }
      }

      return {
        allowed: false,
        remaining: 0,
        reset: now + 60000,
        limit: capacity,
      } as const;
    } catch {
      return {
        allowed: true,
        remaining: Math.max(0, (config?.capacity ?? this.capacity) - 1),
        reset: Date.now() + 60000,
        limit: config?.capacity ?? this.capacity,
      } as const;
    }
  }

  /**
   * Check if a request is allowed (simplified boolean check)
   * 
   * @param serviceId - Service identifier for isolation
   * @param id - Client identifier
   * @param config - Optional rate limit configuration
   * @returns True if request is allowed, false otherwise
   */
  async allow(
    serviceId: string,
    id: string,
    config?: RateLimitConfig
  ): Promise<boolean> {
    const result = await this.check(serviceId, id, config);
    return result.allowed;
  }
}

export default RateLimiter;
