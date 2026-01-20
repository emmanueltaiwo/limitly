import type { Request, Response, NextFunction } from 'express';
import { envConfig } from '../config/env.js';
import RateLimiter from '../algorithms/rateLimiter.js';
import { redisClient } from '../config/redis.js';

const analyticsLimiter = new RateLimiter(redisClient, 100, 10);

export const analyticsAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = req.headers['x-limitly-analytics-token'] as string;
  if (token !== envConfig.ANALYTICS_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const clientId = req.ip ?? 'unknown';
  const result = await analyticsLimiter.check('analytics', clientId);

  if (!result.allowed) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  next();
};
