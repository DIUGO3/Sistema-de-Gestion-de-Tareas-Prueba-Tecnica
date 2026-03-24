import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

type AuthTokenPayload = {
  id: string;
  email: string;
  name: string;
};

export type AuthenticatedRequest = Request & {
  user: AuthTokenPayload;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as AuthTokenPayload;
    (req as AuthenticatedRequest).user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
