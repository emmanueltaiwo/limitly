export type RateLimitAlgorithm =
  | 'token-bucket'
  | 'sliding-window'
  | 'fixed-window'
  | 'leaky-bucket';

export interface RateLimitConfig {
  readonly capacity?: number;
  readonly refillRate?: number;
  readonly limit?: number;
  readonly windowSize?: number;
  readonly leakRate?: number;
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly reset: number;
  readonly limit: number;
}

export interface RateLimitStrategy {
  check(
    serviceId: string,
    id: string,
    config?: RateLimitConfig
  ): Promise<RateLimitResult>;
}
