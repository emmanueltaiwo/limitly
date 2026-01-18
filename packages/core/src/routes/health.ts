import { redisClient } from '../config/redis';
import { Request, Response } from 'express';

export const healthRoutes = async (req: Request, res: Response) => {
  const redisHealth = redisClient.isConnected;
  if (!redisHealth) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Redis connection failed' });
  }

  res.json({ status: 'ok', redis: redisHealth ? 'connected' : 'disconnected' });
};
