import { useCallback, useEffect, useRef, useState } from 'react';
import { SocketFlyweight } from '../services/socket/socket';
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
  const nameSpace = '/message';
  const room = 'general';
  const socket = useRef(SocketFlyweight.getSocket(nameSpace));
  const receiveMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);
  useEffect(() => {
    console.log('join room')
    socket.current.emit('joinRoom', room);

    socket.current.on('receiveMessage', receiveMessage);

    return () => {
      console.log('disconnect from socket')
      socket.current.off('receiveMessage', receiveMessage);
      socket.current.emit('leaveRoom', room);

    };
  }, []);

  const sendMessage = () => {
    socket.current.emit('sendMessage', {
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
      <br></br>
      <button onClick={() => socket.current.emit('leaveRoom', "general")}>Leave</button>
      <br></br>
      <button onClick={() => socket.current.emit('joinRoom', "general")}>Join</button>
    </div>
  );
};
