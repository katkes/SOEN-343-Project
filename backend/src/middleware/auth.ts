import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Logger } from '../configs/logger';
import { ENV_VARS } from '../configs/env';
import { SessionAccountType } from '../types/account';
import { JWT_COOKIE_NAME } from '../configs/constants';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies[JWT_COOKIE_NAME];

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as SessionAccountType;
    req.account = decoded;
    next();
  } catch (error) {
    Logger.error('Error authenticating user:', error);
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid token' });
  }
}
