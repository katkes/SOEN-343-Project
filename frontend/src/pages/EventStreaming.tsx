import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';

export const EventStreaming = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-white px-2 py-1 rounded-full text-[#273266] font-bold shadow"
            >
              ◀
            </button>
            <h1 className="text-3xl font-extrabold text-[#3D50FF] bg-white px-4 py-1 rounded-full shadow">
              AI Conference
            </h1>
          </div>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Streaming Section */}
        <div className="bg-white rounded-xl shadow overflow-hidden p-0 flex flex-col lg:flex-row">
          {/* Video + Details */}
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
              {/* Example messages */}
              <p>
                <strong className="text-[#B4C5FF]">Alice:</strong> Really insightful!
              </p>
              <p>
                <strong className="text-[#B4C5FF]">Bob:</strong> Will slides be available?
              </p>
            </div>
            <div className="flex border-t border-[#2E3247] p-3 gap-2">
              <input
                type="text"
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-sm text-black outline-none"
              />
              <CustomButton
                onClick={handleSend}
                className="bg-[#3D50FF] px-4 py-2 rounded-xl text-white font-semibold text-sm"
              >
                Send
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Stream Details + Q&A */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#273266]">Session: Key Trends in AI</h2>
          <p className="text-sm text-gray-600">
            Dive into the latest advancements in artificial intelligence, featuring insights on
            large language models, generative AI, and industry adoption.
          </p>
          <CustomButton className="bg-[#3D50FF] text-white font-bold py-3 px-6 rounded-xl">
            Join Q&A Session
          </CustomButton>
        </div>
      </main>
    </div>
  );
};
