import type { Request, Response, NextFunction } from 'express';
import { checkServiceRegistry } from '../services/registry.js';

export const serviceRegistryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const serviceId = (req.headers['x-service-id'] as string | undefined) ?? 'default';
  const servicePassword = req.headers['x-service-password'] as string | undefined;

  await checkServiceRegistry(serviceId, servicePassword, req.ip);

  next();
};
