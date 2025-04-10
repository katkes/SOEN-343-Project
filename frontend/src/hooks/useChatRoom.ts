import { useCallback, useEffect, useRef, useState } from 'react';
import { SocketFlyweight } from '../services/socket/socket';
import { NameSpaceEndpoints } from '../config/constants';

interface Message {
  room: string;
  sender: string;
  content: string;
}
export const useChatRoom = (id: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useRef(SocketFlyweight.getSocket(NameSpaceEndpoints.ChatRoom));
  
  const receiveMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);
  
  useEffect(() => {
    if (!id) {
      console.error('Event ID is not defined');
      return;
    }
    const currSocket = socket.current;
    currSocket.connect();
    console.log('connect to socket');
    currSocket.emit('joinRoom', id);
    console.log('join room');

    currSocket.on('receiveMessage', receiveMessage);
    console.log('register function');

    return () => {
      console.log('disconnect from socket');
      currSocket.off('receiveMessage', receiveMessage);
      currSocket.emit('leaveRoom', id);
      currSocket.disconnect();
    };
  }, [id, receiveMessage]);

  const sendNewMessage = (msg: string) => {
    socket.current.emit('sendMessage', {
      room: id,
      content: msg,
    });
  }
  return [messages, sendNewMessage] as const;
};
