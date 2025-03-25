import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
interface Message {
  _id?: string;
  sender: string;
  content: string;
  timestamp?: string;
}
export const ChatRoom: React.FC = () => {
  const socket = io();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const sender = 'User 1';
  const room = 'general';

  useEffect(() => {
    socket.emit('joinRoom', room);

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', {
      room,
      sender,
      content: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat Room: {room}</h2>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
