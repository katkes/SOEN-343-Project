import session from 'express-session';
import { ENV_VARS } from '../configs/env';

export const SessionMiddleware = session({
  secret: ENV_VARS.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  // Set to true in production with HTTPS
  cookie: { secure: ENV_VARS.IS_PROD && ENV_VARS.HTTPS },
});
