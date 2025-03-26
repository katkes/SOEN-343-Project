import { useEffect, useState } from 'react';
import { socket } from '../services/socket/socket';
interface Message {
  _id?: string;
  room: string;
  sender: string;
  content: string;
  timestamp?: string;
}
export const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const sender = 'User 1';
  const room = 'general';

  useEffect(() => {
    console.log('join room')
    socket.emit('joinRoom', room);

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // return () => {
    //   console.log('disconnect from socket')
    //   socket.disconnect();
    // };
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
