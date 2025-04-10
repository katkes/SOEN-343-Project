import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { PageHeader } from '../components/PageHeader';
import { useParams } from 'react-router-dom';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { CompanyAccount, UserAccount } from '../types/account';
import { useChatRoom } from '../hooks/useChatRoom';
import { useStreamBroadcaster } from '../hooks/useStreamBroadcaster';

export const EventViewer = () => {
  // Polling state
  const { id } = useParams<{ id: string }>()
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  // const [hideVotes, setHideVotes] = useState(false);
  // const [anonymousVotes, setAnonymousVotes] = useState(false);
  const [pollActive, setPollActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const { state } = useLocation();
  const { event } = state || {};

  // Fallback event info if not provided
  const displayEvent = {
    title: event?.title || 'Unknown Event',
    date: event?.date || '',
    location: event?.location || '',
  };

  // Configure chatroom connection
  const [newMessage, setNewMessage] = useState("")
  const [messages, sendNewMessage] = useChatRoom(id || "")
  const videoRef = useRef<HTMLVideoElement>(null);
  useStreamBroadcaster(videoRef);;

  // Retrieve user account information
  const account = useAccountInfo();
  const isEventCreator =
    account instanceof CompanyAccount ||
    (account instanceof UserAccount &&
      (['EventOrganizer', 'Sponsor', 'Admin', 'Speaker'].includes(account.role as string)));

  const sendNewMessageHandler = () => {
    if (newMessage.trim() === '' || !id) {
      return;
    }
    sendNewMessage(newMessage);
    setNewMessage('');
  };

  const handleAddOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handleStartOrEndPoll = () => {
    if (!isEventCreator) {
      return;
    }
    if (pollActive) {
      console.log('Poll ended');
      setPollActive(false);
    } else {
      console.log({
        question: pollQuestion,
        options: pollOptions,
        // hideVotes,
        // anonymousVotes,
      });
      setPollActive(true);
    }
  };

  const handleSubmitResponse = () => {
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }
    console.log('Response submitted:', selectedOption);
  };

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Streaming" />

        {event && (
          <div className="bg-[#3D50FF] text-white rounded-xl px-6 py-4 shadow mb-4">
            <h1 className="text-2xl font-bold">{displayEvent.title}</h1>
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
              ref={videoRef} autoPlay playsInline controls
              className="w-full h-full object-cover rounded-l-xl"
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
              {/* <p>
                <strong className="text-[#B4C5FF]">Alice:</strong> Really insightful!
              </p>
              <p>
                <strong className="text-[#B4C5FF]">Bob:</strong> Will slides be available?
              </p> */}
            </div>
            {/* input to send a message to everyone */}
            <div className="flex border-t border-[#2E3247] p-3 gap-2">
              <input
                type="text"
                placeholder="Send a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendNewMessageHandler()}
                className="text-white flex-1 px-3 py-2 rounded-xl text-sm text-black outline-none"
              />
              <CustomButton
                onClick={sendNewMessageHandler}
                className="bg-[#3D50FF] px-4 py-2 rounded-xl text-white font-semibold text-sm"
              >
                Send
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Polling & Q&A */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Session Description */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#273266]">Session: Key Trends in AI</h2>
            <p className="text-sm text-gray-600">
              Dive into the latest advancements in artificial intelligence, featuring insights on
              large language models, generative AI, and industry adoption.
            </p>
            <CustomButton className="bg-[#3D50FF] text-white font-bold py-3 px-6 rounded-xl">
              Join Q&A Session
            </CustomButton>
          </div>

          {/* Polling Section */}
          <div className="w-full lg:w-[350px] bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Live Poll</h3>
            {!isEventCreator ? (
              pollActive ? (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-3 shadow-sm">
                    <input
                      type="text"
                      placeholder="Poll Question"
                      disabled
                      value={pollQuestion}
                      className="w-full bg-gray-100 text-gray-800 font-semibold"
                    />
                  </div>
                  <div className="space-y-3">
                    {pollOptions.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center bg-gray-100 rounded-lg p-2 shadow-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="pollOptions"
                          id={`option-${idx}`}
                          value={option}
                          className="mr-3"
                          onChange={() => setSelectedOption(option)}
                        />
                        <span className="text-gray-700">{option || `Option ${idx + 1}`}</span>
                      </label>
                    ))}
                  </div>
                  <CustomButton
                    className="w-full mt-4 bg-[#3D50FF] hover:bg-[#3248c7] text-white font-semibold rounded-lg py-2"
                    onClick={handleSubmitResponse}
                  >
                    Submit Response
                  </CustomButton>
                </div>
              ) : (
                <div className="text-center text-gray-500">No active poll</div>
              )
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                  <input
                    type="text"
                    placeholder="Poll Question"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="w-full bg-gray-50 text-gray-800 font-semibold"
                  />
                </div>
                <div className="space-y-3">
                  {pollOptions.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={`Option ${idx + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <CustomButton
                        type="button"
                        onClick={() => handleRemoveOption(idx)}
                        className="text-red-500"
                      >
                        Delete
                      </CustomButton>
                    </div>
                  ))}
                </div>
                {!pollActive && (
                  <CustomButton
                    type="button"
                    onClick={handleAddOption}
                    className="w-full text-sm text-blue-600 hover:underline"
                  >
                    + Add Option
                  </CustomButton>
                )}
                <CustomButton
                  className={`w-full mt-4 rounded-lg py-2 font-semibold text-white ${pollActive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#3D50FF] hover:bg-[#3248c7]'}`}
                  onClick={handleStartOrEndPoll}
                >
                  {pollActive ? 'End Poll' : 'Start Poll'}
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
