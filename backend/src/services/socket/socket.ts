import { Server } from 'socket.io';
import { Message } from '../../models/message';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on('sendMessage', async ({ room, sender, content }) => {
      const message = await Message.create({ room, sender, content });
      io.to(room).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
