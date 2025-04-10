import { Server } from 'socket.io';
import { SocketContext } from '../../../types/socket';
import { authMiddleware } from '../middleware/common';
import { NameSpaceBuilder } from '../name-space-builder';

const VideoStreamEvents = {
  joinRoom: 'joinRoom',
  videoFrame: 'video-frame',
  // broadcaster: 'broadcaster',
  // watcher: 'watcher',
  // offer: 'offer',
  // answer: 'answer',
  // iceCandidate: 'ice-candidate',
  disconnectPeer: 'disconnectPeer',
} as const;

// Socket event creators
const joinRoom = ({ socket }: SocketContext) => {
  return (room: string) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  };
};
const videoFrame = ({ socket }: SocketContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data: any) => {
    socket.broadcast.emit('video-frame', data);
    console.log('received and broad casting');
  };
};

const disconnect = ({ socket }: SocketContext) => {
  return () => socket.broadcast.emit(VideoStreamEvents.disconnectPeer, socket.id);
};

export function createVideoStreamNameSpace(io: Server, nameSpace: string) {
  return (
    new NameSpaceBuilder()
      .setIo(io)
      .setNameSpace(nameSpace)
      .addMiddleware(authMiddleware)
      .addSocketEvent(VideoStreamEvents.joinRoom, joinRoom)
      .addSocketEvent(VideoStreamEvents.videoFrame, videoFrame)
      // .addSocketEvent(VideoStreamEvents.broadcaster, broadcaster)
      // .addSocketEvent(VideoStreamEvents.watcher, watcher)
      // .addSocketEvent(VideoStreamEvents.offer, offer)
      // .addSocketEvent(VideoStreamEvents.answer, answer)
      // .addSocketEvent(VideoStreamEvents.iceCandidate, iceCandidate)
      .addOnDisconnectEvent(disconnect)
      .build()
  );
}
