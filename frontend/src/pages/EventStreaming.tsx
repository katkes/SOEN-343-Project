import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { PageHeader } from '../components/PageHeader';
import { SocketFlyweight } from '../services/socket/socket';
import { NameSpaceEndpoints } from '../config/constants';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { CompanyAccount, UserAccount } from '../types/account';
import { Session } from '../types/session';

interface Message {
  room: string;
  sender: string;
  content: string;
}

interface EventDetails {
  name: string;
  description: string;
  date: string;
  location: string;
}

export const EventStreaming = () => {
  const { id } = useParams<{ id: string }>();

  const { state } = useLocation();
  const { event } = state || {};

  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');

  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSessions = async () => {
      try {
        const res = await fetch(`/api/sessions/${id}`);
        const data = await res.json();
        setSessions(data.sessions);
      } catch (err) {
        console.error('Failed to fetch sessions', err);
      }
    };

    fetchSessions();
    const interval = setInterval(fetchSessions, 15000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${id}`);
        const data = await res.json();
        console.log('Retrieved event data:', data);
        // If the API returns the event object directly instead of inside a property, set it directly.
        setEventDetails(data);
      } catch (err) {
        console.error('Failed to fetch event details', err);
      }
    };
    fetchEvent();
  }, [id]);

  const saveSessions = async (updated: Session[]) => {
    try {
      await fetch(`/api/sessions/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessions: updated }),
      });
      setSessions(updated);
    } catch (err) {
      console.error('Failed to save sessions:', err);
    }
  };

  const handleAddSession = () => {
    if (!sessionTitle || !sessionTime) return;
    const updated = [
      ...sessions,
      { title: sessionTitle, time: sessionTime, description: sessionDescription },
    ];
    saveSessions(updated);
    setSessionTitle('');
    setSessionTime('');
    setSessionDescription('');
  };

  const handleDeleteSession = (index: number) => {
    const updated = sessions.filter((_, i) => i !== index);
    saveSessions(updated);
  };

  const displayEvent = {
    title: event?.name || eventDetails?.name || 'Unknown Event',
    description: event?.description || eventDetails?.description || '',
    date: event?.date || eventDetails?.date || '',
    location: event?.location || eventDetails?.location || '',
  };

  const account = useAccountInfo();
  const isEventCreator =
    account instanceof CompanyAccount ||
    (account instanceof UserAccount &&
      ['EventOrganizer', 'Sponsor', 'Admin', 'Speaker'].includes(account.role as string));

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
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
    currSocket.emit('joinRoom', id);
    console.log('join room');

    currSocket.on('receiveMessage', receiveMessage);
    console.log('register function');

    return () => {
      console.log('disconnect from socket');
      currSocket.off('receiveMessage', receiveMessage);
      currSocket.emit('leaveRoom', id);
    };
  }, [id, receiveMessage]);

  const sendNewMessage = () => {
    if (newMessage.trim() === '' || !id) {
      return;
    }
    socket.current.emit('sendMessage', {
      room: id,
      content: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Streaming" />

        {event && (
          <div className="bg-[#3D50FF] text-white rounded-xl px-6 py-4 shadow mb-4">
            <h1 className="text-2xl font-bold">{displayEvent.title}</h1>
            {displayEvent.description && <p className="mt-1">{displayEvent.description}</p>}
            <div className="text-sm">
              {displayEvent.date && <p>📅 {displayEvent.date}</p>}
              {displayEvent.location && <p>📍 {displayEvent.location}</p>}
            </div>
          </div>
        )}

        {/* Streaming Section */}
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col lg:flex-row">
          {/* Video */}
          <div className="flex-1 relative">
            <video
              className="w-full h-full object-cover rounded-l-xl"
              controls
              poster="/assets/thumbnail.jpg"
            >
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-4 left-4 bg-[#3D50FF] text-white px-3 py-1 rounded-full text-xs font-medium shadow">
              LIVE
            </div>
          </div>

          {/* Chat */}
          <div className="w-full lg:w-[350px] bg-[#1B1E2E] text-white flex flex-col justify-between">
            <div className="p-4 border-b border-[#2E3247]">
              <h2 className="font-bold text-white text-sm">Welcome to the chat room!</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm text-gray-200">
              {messages.map((msg) => (
                <p>
                  <strong className="text-[#B4C5FF]">{`${msg.sender}: `}</strong> {msg.content}
                </p>
              ))}
            </div>
            {/* input to send a message to everyone */}
            <div className="flex border-t border-[#2E3247] p-3 gap-2">
              <input
                type="text"
                placeholder="Send a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendNewMessage()}
                className="text-white flex-1 px-3 py-2 rounded-xl text-sm text-black outline-none"
              />
              <CustomButton
                onClick={sendNewMessage}
                className="bg-[#3D50FF] px-4 py-2 rounded-xl text-white font-semibold text-sm"
              >
                Send
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Session Description */}
        <div className="flex flex-col space-y-4">
          <div className="bg-white rounded-xl shadow p-6 space-y-4 w-full">
            <h2 className="text-xl font-bold text-[#273266]">{displayEvent.title}</h2>
            <p className="text-sm text-gray-600">{displayEvent.description}</p>

            <div>
              <h2 className="text-xl font-bold text-[#273266] mb-4">Itinerary</h2>
              {sessions.length > 0 ? (
                <ul className="space-y-3">
                  {sessions.map((session, idx) => (
                    <li
                      key={idx}
                      className="bg-[#F4F6F8] p-4 rounded-xl border-l-4 border-[#3D50FF] flex justify-between items-start"
                    >
                      <div>
                        <h3 className="text-[#3D50FF] font-semibold">{session.title}</h3>
                        <p className="text-sm text-gray-600">🕒 {session.time}</p>
                        <p className="text-sm text-gray-600">{session.description}</p>
                      </div>
                      {isEventCreator && (
                        <button
                          onClick={() => handleDeleteSession(idx)}
                          className="text-red-500 font-bold ml-4"
                        >
                          ✕
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No sessions available.</p>
              )}
            </div>
          </div>

          {isEventCreator && (
            <div className="bg-white rounded-xl shadow p-6 space-y-4 w-full">
              <h2 className="text-xl font-bold text-[#273266]">Add a Session</h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Session Title"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 10:00 AM - 11:00 AM)"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={sessionDescription}
                  onChange={(e) => setSessionDescription(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <CustomButton
                onClick={handleAddSession}
                className="bg-[#3D50FF] text-white font-bold px-6 py-2 rounded-md mt-4"
              >
                Add Session
              </CustomButton>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
