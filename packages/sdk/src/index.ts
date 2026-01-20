import { RedisClient } from './redis-client.js';
import { RateLimiter } from './rate-limiter.js';
import { Analytics } from './analytics.js';
import { PostHogClient } from './posthog-client.js';
import type { PostHogConfig } from './posthog-client.js';

/**
 * limitly-sdk
 * Type-safe rate limiting SDK for Node.js and browsers
 */

export type { PostHogConfig };

/**
 * Configuration options for creating a Limitly client
 */
export interface LimitlyConfig {
  /** Base URL of the Limitly API service (default: https://api.limitly.emmanueltaiwo.dev) */
  baseUrl?: string;
  /** Service identifier for rate limit isolation */
  serviceId?: string;
  /** Request timeout in milliseconds (default: 5000) */
  timeout?: number;
  /** Redis URL for direct Redis connection (optional, uses HTTP API if not provided) */
  redisUrl?: string;
  /** Enable system analytics tracking (default: true) */
  enableSystemAnalytics?: boolean;
  /** PostHog configuration for sending events to your PostHog instance */
  posthog?: PostHogConfig;
}

/**
 * Rate limit information returned from the service
 */
export interface RateLimitInfo {
  /** Total rate limit */
  readonly limit: number;
  /** Remaining requests */
  readonly remaining: number;
  /** Unix timestamp in milliseconds when the limit resets */
  readonly reset: number;
}

/**
 * Response from rate limit check
 */
export interface LimitlyResponse {
  /** Whether the request is allowed */
  readonly allowed: boolean;
  /** Optional error message if rate limited */
  readonly message?: string;
  /** Total rate limit */
  readonly limit?: number;
  /** Remaining requests */
  readonly remaining?: number;
  /** Unix timestamp in milliseconds when the limit resets */
  readonly reset?: number;
}

/**
 * Health check response from the service
 */
export interface HealthResponse {
  /** Service status */
  readonly status: 'ok' | 'error';
  /** Redis connection status */
  readonly redis?: 'connected' | 'disconnected';
  /** Optional error message */
  readonly message?: string;
}

/**
 * Options for checking rate limits
 */
export interface RateLimitOptions {
  /** Client identifier (user ID, IP, etc.) */
  identifier?: string;
  /** Override default service ID */
  serviceId?: string;
  /** Override default capacity (tokens) */
  capacity?: number;
  /** Override default refill rate (tokens per second) */
  refillRate?: number;
  /** Skip rate limiting for this request */
  skip?: boolean;
}

/**
 * Limitly client for rate limiting operations
 */
export class LimitlyClient {
  private readonly baseUrl: string;
  private readonly defaultServiceId?: string;
  private readonly timeout: number;
  private readonly useRedis: boolean;
  private readonly redisClient?: RedisClient;
  private readonly rateLimiter?: RateLimiter;
  private readonly analytics: Analytics;
  private readonly posthogClient?: PostHogClient;

  constructor(config: LimitlyConfig = {}) {
    this.baseUrl = config.baseUrl ?? 'https://api.limitly.emmanueltaiwo.dev';
    this.defaultServiceId = config.serviceId;
    this.timeout = config.timeout ?? 5000;
    
    if (config.posthog) {
      this.posthogClient = new PostHogClient(config.posthog);
    }
    
    this.analytics = new Analytics(
      this.baseUrl,
      config.enableSystemAnalytics !== false,
      this.posthogClient
    );
    
    if (config.redisUrl) {
      this.useRedis = true;
      this.redisClient = new RedisClient(config.redisUrl);
      this.rateLimiter = new RateLimiter(this.redisClient, 100, 10);
      this.redisClient.connect().catch(() => {});
    } else {
      this.useRedis = false;
    }
  }

  async shutdown(): Promise<void> {
    await this.analytics.shutdown();
  }

  private async request(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers as Record<string, string>),
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Check if a request is allowed based on rate limits
   * 
   * @param options - Rate limit options or identifier string
   * @returns Rate limit response with allowed status and metadata
   * 
   * @example
   * ```typescript
   * const result = await client.checkRateLimit('user-123');
   * if (!result.allowed) {
   *   // Rate limited
   * }
   * ```
   */
  async checkRateLimit(
    options?: RateLimitOptions | string
  ): Promise<LimitlyResponse> {
    const opts: RateLimitOptions =
      options === undefined || typeof options === 'string'
        ? { identifier: options }
        : options;

    if (opts.skip === true) {
      return {
        allowed: true,
        limit: 0,
        remaining: 0,
        reset: 0,
      } as const;
    }

    if (this.useRedis && this.rateLimiter) {
      try {
        const serviceId = opts.serviceId ?? this.defaultServiceId ?? 'default';
        const clientId = opts.identifier ?? 'unknown';
        const config = 
          typeof opts.capacity === 'number' || typeof opts.refillRate === 'number'
            ? { capacity: opts.capacity, refillRate: opts.refillRate }
            : undefined;

        const result = await this.rateLimiter.check(serviceId, clientId, config);

        this.analytics.trackRateLimitCheck(
          serviceId,
          clientId,
          result.allowed,
          result.remaining,
          result.limit,
          result.reset,
          !!config,
          config?.capacity,
          config?.refillRate
        );

        if (!result.allowed) {
          return {
            allowed: false,
            message: 'Too many requests',
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
          } as LimitlyResponse;
        }

        return {
          allowed: true,
          limit: result.limit,
          remaining: result.remaining,
          reset: result.reset,
        } as LimitlyResponse;
      } catch {
        return {
          allowed: true,
        } as LimitlyResponse;
      }
    }

    try {
      const headers: Record<string, string> = {};

      if (opts.identifier) {
        headers['X-Client-Id'] = opts.identifier;
      }

      const serviceId = opts.serviceId ?? this.defaultServiceId;
      if (serviceId) {
        headers['X-Service-Id'] = serviceId;
      }

      if (typeof opts.capacity === 'number' && opts.capacity > 0) {
        headers['X-Rate-Limit-Capacity'] = opts.capacity.toString();
      }

      if (typeof opts.refillRate === 'number' && opts.refillRate >= 0) {
        headers['X-Rate-Limit-Refill'] = opts.refillRate.toString();
      }

      const response = await this.request('/api/rate-limit', {
        method: 'GET',
        headers,
      });

      const limitHeader = response.headers.get('X-RateLimit-Limit');
      const remainingHeader = response.headers.get('X-RateLimit-Remaining');
      const resetHeader = response.headers.get('X-RateLimit-Reset');

      const limitInfo: {
        limit?: number;
        remaining?: number;
        reset?: number;
      } = {
        ...(limitHeader && { limit: Number.parseInt(limitHeader, 10) }),
        ...(remainingHeader && { remaining: Number.parseInt(remainingHeader, 10) }),
        ...(resetHeader && { reset: Number.parseInt(resetHeader, 10) * 1000 }),
      };

      if (response.status === 429) {
        const data = (await response.json().catch(() => ({}))) as {
          message?: string;
        };
        return {
          allowed: false,
          message: data.message ?? 'Too many requests',
          limit: limitInfo.limit,
          remaining: limitInfo.remaining,
          reset: limitInfo.reset,
        } as LimitlyResponse;
      }

      if (!response.ok) {
        throw new Error(`Rate limit check failed: ${response.statusText}`);
      }

      const data = (await response.json().catch(() => ({}))) as {
        limit?: number;
        remaining?: number;
        reset?: number;
      };

      return {
        allowed: true,
        limit: limitInfo.limit ?? data.limit,
        remaining: limitInfo.remaining ?? data.remaining,
        reset: limitInfo.reset ?? data.reset,
      } as LimitlyResponse;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Rate limit check timed out');
      }
      return {
        allowed: true,
      } as LimitlyResponse;
    }
  }

  /**
   * Check the health status of the Limitly service
   * 
   * @returns Health check response
   * 
   * @example
   * ```typescript
   * const health = await client.health();
   * console.log(health.status); // 'ok' | 'error'
   * ```
   */
  async health(): Promise<HealthResponse> {
    if (this.useRedis && this.redisClient) {
      return {
        status: this.redisClient.isConnected ? 'ok' : 'error',
        redis: this.redisClient.isConnected ? 'connected' : 'disconnected',
      };
    }

    try {
      const response = await this.request('/api/health', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }

      return (await response.json()) as HealthResponse;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Health check timed out');
      }
      throw error;
    }
  }
}

/**
 * Create a new Limitly client instance
 * 
 * @param config - Optional client configuration
 * @returns Limitly client instance
 * 
 * @example
 * ```typescript
 * const client = createClient({ serviceId: 'my-app' });
 * ```
 */
export function createClient(config?: LimitlyConfig): LimitlyClient {
  return new LimitlyClient(config);
}


export default LimitlyClient;
