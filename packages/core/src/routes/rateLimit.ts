import { Request, Response, NextFunction } from 'express';

export const rateLimitRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  next();
};
