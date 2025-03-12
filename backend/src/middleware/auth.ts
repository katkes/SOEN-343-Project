import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Logger } from '../configs/logger';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretjwtkey';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.session.token;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { _id: string };
    req.user = decoded;
    next();
  } catch (error) {
    Logger.error('Error authenticating user:', error);
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid token' });
  }
}
