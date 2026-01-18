import RateLimiter from '../algorithms/rateLimiter';
import type { Request, Response, NextFunction } from 'express';

/**
 * Express middleware for rate limiting
 * 
 * @param limiter - Rate limiter instance
 * @returns Express middleware function
 */
export const rateLimitMiddleware =
  (limiter: RateLimiter) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const serviceId = (req.headers['x-service-id'] as string | undefined) ?? 'default';
    const clientId = (req.headers['x-client-id'] as string | undefined) ?? req.ip ?? 'unknown';

    const capacityHeader = req.headers['x-rate-limit-capacity'];
    const refillRateHeader = req.headers['x-rate-limit-refill'];

    const capacity = capacityHeader
      ? Number.parseInt(capacityHeader as string, 10)
      : undefined;
    const refillRate = refillRateHeader
      ? Number.parseFloat(refillRateHeader as string)
      : undefined;

    const config =
      typeof capacity === 'number' || typeof refillRate === 'number'
        ? { capacity, refillRate }
        : undefined;

    const result = await limiter.check(serviceId, clientId, config);

    res.setHeader('X-RateLimit-Limit', result.limit.toString());
    res.setHeader('X-RateLimit-Remaining', Math.max(0, result.remaining).toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(result.reset / 1000).toString());

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
