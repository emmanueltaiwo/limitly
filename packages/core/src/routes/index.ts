import { Router } from 'express';
import healthRoutes from './health.js';
import { rateLimitMiddleware } from '../middleware/rateLimiterMiddleware.js';
import RateLimiter from '../algorithms/rateLimiter.js';
import rateLimitRoutes from './rateLimit.js';
import analyticsRoutes from './analytics.js';

const router = Router();

router.use('/health', healthRoutes);
router.use(
  '/rate-limit',
  rateLimitMiddleware(new RateLimiter('token-bucket', 100, 10, 100, 60000, 10)),
  rateLimitRoutes
);
router.use('/analytics', analyticsRoutes);

export default router;
