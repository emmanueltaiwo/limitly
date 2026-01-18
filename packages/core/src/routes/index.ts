import { Router } from 'express';
import { healthRoutes } from './health';
import { rateLimitMiddleware } from '../middleware/rateLimiterMiddleware';
import RateLimiter from '../algorithms/rateLimiter';
import { redisClient } from '../config/redis';
import { rateLimitRoutes } from './rateLimit';

const router = Router();

router.use('/health', healthRoutes);
router.use(
  '/rate-limit',
  rateLimitMiddleware(new RateLimiter(redisClient, 100, 10)),
  rateLimitRoutes
);

export default router;
