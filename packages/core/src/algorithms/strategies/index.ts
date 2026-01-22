import { redisClient } from '../../config/redis.js';
import type { RateLimitAlgorithm, RateLimitStrategy } from './types.js';
import { TokenBucketStrategy } from './token-bucket.js';
import { SlidingWindowStrategy } from './sliding-window.js';
import { FixedWindowStrategy } from './fixed-window.js';
import { LeakyBucketStrategy } from './leaky-bucket.js';

export function createStrategy(
  algorithm: RateLimitAlgorithm,
  defaultCapacity: number,
  defaultRefillRate: number,
  defaultLimit: number,
  defaultWindowSize: number,
  defaultLeakRate: number
): RateLimitStrategy {
  switch (algorithm) {
    case 'token-bucket':
      return new TokenBucketStrategy(
        redisClient,
        defaultCapacity,
        defaultRefillRate
      );
    case 'sliding-window':
      return new SlidingWindowStrategy(
        redisClient,
        defaultLimit,
        defaultWindowSize
      );
    case 'fixed-window':
      return new FixedWindowStrategy(
        redisClient,
        defaultLimit,
        defaultWindowSize
      );
    case 'leaky-bucket':
      return new LeakyBucketStrategy(
        redisClient,
        defaultCapacity,
        defaultLeakRate
      );
    default:
      return new TokenBucketStrategy(
        redisClient,
        defaultCapacity,
        defaultRefillRate
      );
  }
}

export type {
  RateLimitAlgorithm,
  RateLimitConfig,
  RateLimitResult,
  RateLimitStrategy,
} from './types.js';
