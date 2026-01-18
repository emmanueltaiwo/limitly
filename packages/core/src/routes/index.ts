import { Router } from 'express';
import { healthRoutes } from './health.js';
import { rateLimitMiddleware } from '../middleware/rateLimiterMiddleware.js';
import RateLimiter from '../algorithms/rateLimiter.js';
import { redisClient } from '../config/redis.js';
import { rateLimitRoutes } from './rateLimit.js';

const router = Router();

router.use('/health', healthRoutes);
router.use(
  '/rate-limit',
  rateLimitMiddleware(new RateLimiter(redisClient, 100, 10)),
  rateLimitRoutes
);

export default router;
