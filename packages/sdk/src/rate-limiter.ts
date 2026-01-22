import type { RedisClient } from './redis-client.js';
import type {
  RateLimitConfig,
  RateLimitResult,
  RateLimitStrategy,
} from './strategies/types.js';
import { createStrategy, type RateLimitAlgorithm } from './strategies/index.js';

export class RateLimiter {
  private readonly strategy: RateLimitStrategy;

  constructor(
    private readonly redis: RedisClient,
    algorithm: RateLimitAlgorithm,
    defaultCapacity: number,
    defaultRefillRate: number,
    defaultLimit: number,
    defaultWindowSize: number,
    defaultLeakRate: number
  ) {
    this.strategy = createStrategy(
      algorithm,
      redis,
      defaultCapacity,
      defaultRefillRate,
      defaultLimit,
      defaultWindowSize,
      defaultLeakRate
    );
  }

  async check(
    serviceId: string,
    id: string,
    config?: RateLimitConfig
  ): Promise<RateLimitResult> {
    return this.strategy.check(serviceId, id, config);
  }
}
