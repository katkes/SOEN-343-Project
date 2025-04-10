import session from 'express-session';
import express from 'express';

declare module 'express-session' {
  interface SessionData {
    token?: string;
  }
}

declare module 'express' {
  interface Request {
    account?: SessionAccount; // Extend the Request type
  }
}

export = session;
export = express;
