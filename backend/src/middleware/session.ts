import session from 'express-session';
import { ENV_VARS } from '../configs/env';
import { Types } from 'mongoose';

export const SessionMiddleware = session({
  secret: ENV_VARS.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  // Set to true in production with HTTPS
  cookie: { secure: ENV_VARS.IS_PROD && ENV_VARS.HTTPS },
});

export type SessionAccountType = { _id: Types.ObjectId; accountType: 'company' | 'user' };
