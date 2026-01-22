import RateLimiter, {
  type RateLimitAlgorithm,
} from '../algorithms/rateLimiter.js';
import type { Request, Response, NextFunction } from 'express';
import { trackRateLimitResult } from '../analytics/events.js';

export const rateLimitMiddleware =
  (limiter: RateLimiter) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const serviceId =
      (req.headers['x-service-id'] as string | undefined) ?? 'default';
    const clientId =
      (req.headers['x-client-id'] as string | undefined) ?? req.ip ?? 'unknown';

    const algorithmHeader = req.headers['x-rate-limit-algorithm'] as
      | string
      | undefined;
    const capacityHeader = req.headers['x-rate-limit-capacity'];
    const refillRateHeader = req.headers['x-rate-limit-refill'];
    const limitHeader = req.headers['x-rate-limit-limit'];
    const windowSizeHeader = req.headers['x-rate-limit-window-size'];
    const leakRateHeader = req.headers['x-rate-limit-leak-rate'];

    const algorithm =
      (algorithmHeader as RateLimitAlgorithm | undefined) ?? 'token-bucket';
    const capacity = capacityHeader
      ? Number.parseInt(capacityHeader as string, 10)
      : undefined;
    const refillRate = refillRateHeader
      ? Number.parseFloat(refillRateHeader as string)
      : undefined;
    const limit = limitHeader
      ? Number.parseInt(limitHeader as string, 10)
      : undefined;
    const windowSize = windowSizeHeader
      ? Number.parseInt(windowSizeHeader as string, 10)
      : undefined;
    const leakRate = leakRateHeader
      ? Number.parseFloat(leakRateHeader as string)
      : undefined;

    const config: {
      capacity?: number;
      refillRate?: number;
      limit?: number;
      windowSize?: number;
      leakRate?: number;
    } = {};
    if (typeof capacity === 'number') config.capacity = capacity;
    if (typeof refillRate === 'number') config.refillRate = refillRate;
    if (typeof limit === 'number') config.limit = limit;
    if (typeof windowSize === 'number') config.windowSize = windowSize;
    if (typeof leakRate === 'number') config.leakRate = leakRate;

    const requestLimiter =
      algorithm !== 'token-bucket'
        ? new RateLimiter(algorithm, 100, 10, 100, 60000, 10)
        : limiter;

    const result = await requestLimiter.check(serviceId, clientId, config);

    // Track analytics event
    trackRateLimitResult(serviceId, clientId, result, {
      hasCustomConfig: !!config,
      customCapacity: config?.capacity,
      customRefillRate: config?.refillRate,
      ipAddress: req.ip,
    });

    res.setHeader('X-RateLimit-Limit', result.limit.toString());
    res.setHeader(
      'X-RateLimit-Remaining',
      Math.max(0, result.remaining).toString()
    );
    res.setHeader(
      'X-RateLimit-Reset',
      Math.ceil(result.reset / 1000).toString()
    );

    if (!result.allowed) {
      const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
      res.setHeader('Retry-After', retryAfter.toString());
      res.status(429).json({
        message: 'Too many requests',
        limit: result.limit,
        remaining: 0,
        reset: result.reset,
      });
      return;
    }

    next();
  };
