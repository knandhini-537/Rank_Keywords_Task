import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    userType: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For seamless dev demo, allow guest/mock user if token missing
    req.user = {
      id: 'demo-user-123',
      email: 'demo@magicbricks-ai.com',
      userType: 'Owner'
    };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'magicbricks_secret') as any;
    req.user = decoded;
    next();
  } catch (error) {
    // Fallback to demo user if token invalid
    req.user = {
      id: 'demo-user-123',
      email: 'demo@magicbricks-ai.com',
      userType: 'Owner'
    };
    next();
  }
};
