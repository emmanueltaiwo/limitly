import type { Request, Response } from 'express';
import { trackServiceRequest } from '../analytics/events.js';

export const getRateLimit = async (req: Request, res: Response): Promise<void> => {
  const serviceId = (req.headers['x-service-id'] as string | undefined) ?? 'default';
  const clientId = (req.headers['x-client-id'] as string | undefined) ?? req.ip ?? 'unknown';

  trackServiceRequest({
    serviceId,
    clientId,
    endpoint: req.path,
    method: req.method,
    ipAddress: req.ip,
  });

  const remaining = Number.parseInt(res.getHeader('X-RateLimit-Remaining') as string || '0', 10);
  const limit = Number.parseInt(res.getHeader('X-RateLimit-Limit') as string || '0', 10);
  const resetHeader = res.getHeader('X-RateLimit-Reset') as string;
  const reset = resetHeader ? Number.parseInt(resetHeader, 10) * 1000 : 0;

  res.json({ 
    message: 'Allowed',
    limit,
    remaining,
    reset
  });
};
