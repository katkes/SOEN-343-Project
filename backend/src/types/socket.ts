import { ExtendedError, Namespace, Socket } from 'socket.io';

export type SocketMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => void;
export type ConnectionEvent = (socket: SocketContext) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SocketEvent = (...args: any[]) => void;
export type SocketContext = {
  socket: Socket;
  nameSpace: Namespace;
};
