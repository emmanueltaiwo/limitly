import { redisClient } from '../config/redis.js';
import type { Request, Response } from 'express';

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  const redisHealth = redisClient.isConnected;
  if (!redisHealth) {
    res
      .status(500)
      .json({ status: 'error', message: 'Redis connection failed' });
    return;
  }

  res.json({ status: 'ok', redis: redisHealth ? 'connected' : 'disconnected' });
};
