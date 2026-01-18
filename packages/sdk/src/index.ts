/**
 * @limitly/sdk
 * Type-safe rate limiting SDK for Node.js and browsers
 */

/**
 * Configuration options for creating a Limitly client
 */
export interface LimitlyConfig {
  /** Service identifier for rate limit isolation */
  serviceId?: string;
  /** Request timeout in milliseconds (default: 5000) */
  timeout?: number;
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

  constructor(config: LimitlyConfig = {}) {
    this.baseUrl = 'https://api.limitly.emmanueltaiwo.dev';
    this.defaultServiceId = config.serviceId;
    this.timeout = config.timeout ?? 5000;
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
    try {
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

/**
 * Create a rate limit checker function
 * 
 * @param config - Optional client configuration or service ID string
 * @returns Async function to check rate limits
 * 
 * @example
 * ```typescript
 * const checkLimit = rateLimit({ serviceId: 'my-app' });
 * const result = await checkLimit('user-123');
 * ```
 */
export function rateLimit(
  config?: LimitlyConfig | string
): (options?: RateLimitOptions | string) => Promise<LimitlyResponse> {
  const client = createClient(
    typeof config === 'string' ? { serviceId: config } : config
  );
  return async (options?: RateLimitOptions | string) => {
    return await client.checkRateLimit(options);
  };
}

export default LimitlyClient;
