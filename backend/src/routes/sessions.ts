//Route: backend/src/routes/sessions.ts

import express, { Request, Response } from 'express';
import { getSessions, saveSessions } from '../stores/sessionStore';
import { Session } from '../types/session';

const router = express.Router();

router.get('/:eventId', (req: Request<{ eventId: string }>, res: Response) => {
  const sessions = getSessions(req.params.eventId);
  res.json({ sessions });
});

router.post('/:eventId', (req: Request, res: Response): void => {
  const { sessions } = req.body as { sessions: Session[] };
  const { eventId } = req.params as { eventId: string };

  if (!Array.isArray(sessions)) {
    res.status(400).json({ error: 'Invalid session format' });
    return;
  }

  saveSessions(eventId, sessions);
  res.status(200).json({ message: 'Sessions updated' });
});

export default router;
