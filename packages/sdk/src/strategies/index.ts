import type { RedisClient } from '../redis-client.js';
import type { RateLimitAlgorithm, RateLimitStrategy } from './types.js';
import { TokenBucketStrategy } from './token-bucket.js';
import { SlidingWindowStrategy } from './sliding-window.js';
import { FixedWindowStrategy } from './fixed-window.js';
import { LeakyBucketStrategy } from './leaky-bucket.js';

export function createStrategy(
  algorithm: RateLimitAlgorithm,
  redis: RedisClient,
  defaultCapacity: number,
  defaultRefillRate: number,
  defaultLimit: number,
  defaultWindowSize: number,
  defaultLeakRate: number
): RateLimitStrategy {
  switch (algorithm) {
    case 'token-bucket':
      return new TokenBucketStrategy(redis, defaultCapacity, defaultRefillRate);
    case 'sliding-window':
      return new SlidingWindowStrategy(redis, defaultLimit, defaultWindowSize);
    case 'fixed-window':
      return new FixedWindowStrategy(redis, defaultLimit, defaultWindowSize);
    case 'leaky-bucket':
      return new LeakyBucketStrategy(redis, defaultCapacity, defaultLeakRate);
    default:
      return new TokenBucketStrategy(redis, defaultCapacity, defaultRefillRate);
  }
}

export type {
  RateLimitAlgorithm,
  RateLimitConfig,
  RateLimitResult,
  RateLimitStrategy,
} from './types.js';
