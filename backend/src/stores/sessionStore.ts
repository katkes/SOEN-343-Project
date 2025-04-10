// backend/stores/sessionStore.ts

import { Session } from '../types/session'; // adjust path as needed

const sessionStore: Record<string, Session[]> = {};

export const getSessions = (eventId: string): Session[] => {
  return sessionStore[eventId] || [];
};

export const saveSessions = (eventId: string, sessions: Session[]): void => {
  sessionStore[eventId] = sessions;
};
