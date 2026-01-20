import { Router } from 'express';
import healthRoutes from './health.js';
import { rateLimitMiddleware } from '../middleware/rateLimiterMiddleware.js';
import { serviceRegistryMiddleware } from '../middleware/serviceRegistry.js';
import RateLimiter from '../algorithms/rateLimiter.js';
import { redisClient } from '../config/redis.js';
import rateLimitRoutes from './rateLimit.js';
import analyticsRoutes from './analytics.js';

const router = Router();

router.use('/health', healthRoutes);
router.use(
  '/rate-limit',
  serviceRegistryMiddleware,
  rateLimitMiddleware(new RateLimiter(redisClient, 100, 10)),
  rateLimitRoutes
);
router.use('/analytics', analyticsRoutes);

export default router;
