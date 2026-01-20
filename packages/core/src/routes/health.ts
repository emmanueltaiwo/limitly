import { Router } from 'express';
import { getHealth } from '../controllers/health.js';

const router = Router();

router.get('/', getHealth);

export default router;
