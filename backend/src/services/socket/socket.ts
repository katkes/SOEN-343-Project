import { Server } from 'socket.io';
import { Logger } from '../../configs/logger';
import { createMessageNameSpace } from './namespaces/direct-message';
import { NameSpaceEndpoints } from './name-space-endpoints';
import { NameSpaceFactory } from './name-space-factory';
import { createChatRoomNameSpace } from './namespaces/chatroom';
import { createVideoStreamNameSpace } from './namespaces/video-stream';

export const SetupSocket = (io: Server) => {
  NameSpaceFactory.createNameSpace(io, NameSpaceEndpoints.DirectMessaging, createMessageNameSpace);
  NameSpaceFactory.createNameSpace(io, NameSpaceEndpoints.ChatRoom, createChatRoomNameSpace);
  NameSpaceFactory.createNameSpace(io, NameSpaceEndpoints.VideoStream, createVideoStreamNameSpace);

  Logger.info('Socket IO successfully configured on server host.');
};
