import { Server } from 'socket.io';
import { SocketContext } from '../../../types/socket';
import { authMiddleware } from '../middleware/common';
import { NameSpaceBuilder } from '../name-space-builder';
import { Logger } from '../../../configs/logger';

const VideoStreamEvents = {
  joinRoom: 'joinRoom',
  broadcaster: 'broadcaster',
  watcher: 'watcher',
  offer: 'offer',
  answer: 'answer',
  iceCandidate: 'ice-candidate',
  disconnectPeer: 'disconnectPeer',
} as const;

// Socket event creators
const joinRoom = ({ socket }: SocketContext) => {
  return (room: string) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  };
};
const broadcaster = ({ socket }: SocketContext) => {
  return () => {
    Logger.info(`User ${socket.id} is a broadcaster`);
    socket.broadcast.emit('broadcaster', socket.id);
  };
};

const watcher = ({ socket, nameSpace }: SocketContext) => {
  return (broadcasterId: string) => {
    Logger.info(`User ${socket.id} is a watcher`);
    nameSpace.to(broadcasterId).emit('watcher', socket.id);
  };
};
const offer = ({ socket, nameSpace }: SocketContext) => {
  return (id: string, offer: string) => {
    nameSpace.to(id).emit(VideoStreamEvents.offer, socket.id, offer);
  };
};
const answer = ({ socket, nameSpace }: SocketContext) => {
  return (id: string, answer: string) => {
    nameSpace.to(id).emit(VideoStreamEvents.offer, socket.id, answer);
  };
};
const iceCandidate = ({ socket, nameSpace }: SocketContext) => {
  return (id: string, candidate: string) => {
    nameSpace.to(id).emit('ice-candidate', socket.id, candidate);
  };
};

const disconnect = ({ socket }: SocketContext) => {
  return () => socket.broadcast.emit(VideoStreamEvents.disconnectPeer, socket.id);
};

export function createVideoStreamNameSpace(io: Server, nameSpace: string) {
  return new NameSpaceBuilder()
    .setIo(io)
    .setNameSpace(nameSpace)
    .addMiddleware(authMiddleware)
    .addSocketEvent(VideoStreamEvents.joinRoom, joinRoom)
    .addSocketEvent(VideoStreamEvents.broadcaster, broadcaster)
    .addSocketEvent(VideoStreamEvents.watcher, watcher)
    .addSocketEvent(VideoStreamEvents.offer, offer)
    .addSocketEvent(VideoStreamEvents.answer, answer)
    .addSocketEvent(VideoStreamEvents.iceCandidate, iceCandidate)
    .addOnDisconnectEvent(disconnect)
    .build();
}
