import type {
  RateLimitConfig,
  RateLimitResult,
  RateLimitStrategy,
  RateLimitAlgorithm,
} from './strategies/types.js';
import { createStrategy } from './strategies/index.js';

export type { RateLimitResult, RateLimitConfig, RateLimitAlgorithm };

class RateLimiter {
  private readonly strategy: RateLimitStrategy;

  constructor(
    algorithm: RateLimitAlgorithm,
    defaultCapacity: number,
    defaultRefillRate: number,
    defaultLimit: number,
    defaultWindowSize: number,
    defaultLeakRate: number
  ) {
    this.strategy = createStrategy(
      algorithm,
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
