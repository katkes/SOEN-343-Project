import { Server } from 'socket.io';
import { IMessage } from '../../../models/message';
import { SocketContext } from '../../../types/socket';
import { AuthenticatedSocket, authMiddleware } from '../middleware/common';
import { NameSpaceBuilder } from '../name-space-builder';
import { Logger } from '../../../configs/logger';

const ChatRoomEvents = {
  joinRoom: 'joinRoom',
  leaveRoom: 'leaveRoom',
  sendMessage: 'sendMessage',
  disconnect: 'disconnect',
};

// Socket event creators
const joinRoom = ({ socket }: SocketContext) => {
  return (room: string) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  };
};

const leaveRoom = ({ socket }: SocketContext) => {
  return (room: string) => {
    socket.leave(room);
    console.log(`User left room ${room}`);
  };
};

interface Message {
  room: string;
  sender: string;
  content: string;
}
const sendMessage = ({ socket, nameSpace }: SocketContext) => {
  return async ({ room, content }: IMessage) => {
    // const message = await Message.create();
    const user = (socket as AuthenticatedSocket).user;
    if (!user) {
      Logger.error('User not authenticated');
      return;
    }
    Logger.info(`User ${user.firstName} ${user.lastName} sent message: ${content}`);
    nameSpace
      .to(room)
      .emit('receiveMessage', {
        room,
        sender: `${user.firstName} ${user.lastName}`,
        content,
      } as Message);
    // nameSpace.to(room).emit('receiveMessage', message);
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

export function createChatRoomNameSpace(io: Server, nameSpace: string) {
  return new NameSpaceBuilder()
    .setIo(io)
    .setNameSpace(nameSpace)
    .addMiddleware(authMiddleware)
    .addSocketEvent(ChatRoomEvents.joinRoom, joinRoom)
    .addSocketEvent(ChatRoomEvents.leaveRoom, leaveRoom)
    .addSocketEvent(ChatRoomEvents.sendMessage, sendMessage)
    .addSocketEvent(ChatRoomEvents.disconnect, disconnect)
    .build();
}
