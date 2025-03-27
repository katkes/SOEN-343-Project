import { Server } from 'socket.io';
import { IMessage, Message } from '../../../models/message';
import { SocketNameSpaceBuilder } from '../socket';
import { SocketContext } from '../../../types/socket';
import { authMiddleware } from '../middleware/common';

const DirectMessageEvents = {
  joinRoom: 'joinRoom',
  leaveRoom: 'leaveRoom',
  sendMessage: 'sendMessage',
  receiveMessage: 'receiveMessage',
};

// Socket event creators
const joinRoom = ({ socket }: SocketContext) => {
  return (room: string) => {
    socket.join(room);
    socket.emit(DirectMessageEvents.joinRoom);
    console.log(`User joined room ${room}`);
  };
};

const leaveRoom = ({ socket }: SocketContext) => {
  return (room: string) => {
    socket.leave(room);
    console.log(`User left room ${room}`);
  };
};

const sendMessage = ({ nameSpace }: SocketContext) => {
  return async ({ room, sender, content }: IMessage) => {
    const message = await Message.create({ room, sender, content });
    nameSpace.to(room).emit('receiveMessage', message);
  };
};

const disconnect = () => {
  return () => {
    console.log('User disconnected');
  };
};

// Create socket middleware
// const consoleLogMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
//   console.log(`Socket connected: ${socket.id}`);
//   next();
// }

export function createMessageNameSpace(io: Server, nameSpace: string) {
  return new SocketNameSpaceBuilder()
    .setIo(io)
    .setNameSpace(nameSpace)
    .addMiddleware(authMiddleware)
    .addSocketEvent('joinRoom', joinRoom)
    .addSocketEvent('leaveRoom', leaveRoom)
    .addSocketEvent('sendMessage', sendMessage)
    .addSocketEvent('disconnect', disconnect)
    .build();
}
