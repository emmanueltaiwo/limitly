import { Router } from 'express';
import { getRateLimit } from '../controllers/rateLimit.js';

const router = Router();

router.get('/', getRateLimit);

export default router;
