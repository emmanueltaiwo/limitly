import { Router } from 'express';
import { analyticsAuth } from '../middleware/analyticsAuth.js';
import { postAnalytics } from '../controllers/analytics.js';

const router = Router();

router.post('/', analyticsAuth, postAnalytics);

export default router;
