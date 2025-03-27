// middleware/auth.middleware.ts
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import * as cookie from 'cookie'; // safe way for ESM
import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../../../configs/env';
import { SessionAccountType } from '../../../types/account';
import { JWT_COOKIE_NAME } from '../../../configs/constants';

export interface AuthenticatedSocket extends Socket {
  account?: SessionAccountType;
}

export function authMiddleware(socket: AuthenticatedSocket, next: (_?: ExtendedError) => void) {
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const token = cookies[JWT_COOKIE_NAME];

  if (!token) {
    return next(new Error('Unauthorized: No token found'));
  }

  try {
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as SessionAccountType;
    socket.account = decoded;
    next();
  } catch {
    return next(new Error('Unauthorized: Invalid token'));
  }
}
