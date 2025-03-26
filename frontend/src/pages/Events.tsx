import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [creatingNewEvent, setCreatingNewEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const navigate = useNavigate();


  const [selectedEventType, setSelectedEventType] = useState<'myEvents' | 'otherEvents' | null>(
    'myEvents'
  );

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const allParticipants = [
    {
      title: 'Security Workshop',
      speaker: 'Jane Doe',
      date: 'April 4th 2025',
      location: 'SGW Campus',
      organizer: 'MegaSoft Inc',
      type: 'hybrid',
      isUserRegistered: true,
    },
    {
      title: 'AI Conference',
      speaker: 'John Smith',
      date: 'May 10th 2025',
      location: 'Loyola Campus',
      organizer: 'TechWorld',
      type: 'in-person',
      isUserRegistered: false,
    },
    {
      title: 'Cloud Computing Seminar',
      speaker: 'Alice Johnson',
      date: 'June 15th 2025',
      location: 'Online',
      organizer: 'CloudTech',
      type: 'virtual',
      isUserRegistered: true,
    },
    {
      title: 'Cybersecurity Meetup',
      speaker: 'Bob Brown',
      date: 'July 20th 2025',
      location: 'SGW Campus',
      organizer: 'SecureNet',
      type: 'hybrid',
      isUserRegistered: false,
    },
  ];

  const filteredParticipants = allParticipants.filter((p) =>
    selectedEventType === 'myEvents' ? p.isUserRegistered : !p.isUserRegistered
  );

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Top header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#273266] bg-white px-4 py-2 rounded-full shadow">
            Events
          </h1>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Main content grid */}
        <div className="flex flex-col">
          {/* Left Panel */}
          <div className="flex flex-1/5 gap-3 ">
            <CustomButton
              className={`${
                selectedEventType === 'myEvents' && !creatingNewEvent
                  ? 'bg-[#273266]'
                  : 'bg-[#3D50FF]'
              } text-white text-sm font-semibold p-4 rounded-xl mb-4`}
              width="w-[200px]"
              onClick={() => {
                setSelectedEventType('myEvents');
                setCreatingNewEvent(false);
              }}
            >
              My Events
            </CustomButton>
            <CustomButton
              className={`${
                selectedEventType === 'otherEvents' && !creatingNewEvent
                  ? 'bg-[#273266]'
                  : 'bg-[#3D50FF]'
              } text-white text-sm font-semibold p-4 rounded-xl mb-4`}
              width="w-[200px]"
              onClick={() => {
                setSelectedEventType('otherEvents');
                setCreatingNewEvent(false);
              }}
            >
              Other Events
            </CustomButton>
            <CustomButton
              className={`${
                creatingNewEvent ? 'bg-[#273266]' : 'bg-[#3D50FF]'
              } text-white text-sm font-semibold p-4 rounded-xl mb-4`}
              width="w-[200px]"
              onClick={() => {
                setCreatingNewEvent(true);
                setSelectedEventType(null); // Reset selectedEventType when creating a new event
              }}
            >
              Create New Event +
            </CustomButton>
          </div>

          {/* Right Panel */}
          <div className=" flex-4/5 overflow-hidden py-3">
            {creatingNewEvent ? (
              <>
                {/* New Event Form */}
                <div className="text-[#273266]  rounded-xl shadow border-0.5">
                  <div className="flex flex-col justify-center banner py-12 px-12 gap-6">
                    <div className="flex flex-col md:flex-row gap-4 text-white text-sm font-medium">
                      <input
                        type="text"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                        placeholder="dd-mm-yyyy"
                      />
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                        placeholder="Location"
                      />
                    </div>

                    <input
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="text-3xl font-bold text-white bg-transparent outline-none border-b-2 border-white/50 focus:border-white w-full max-w-md placeholder-gray-100"
                      placeholder="Event Title"
                    />

                    <div className="bg-white w-2/5 rounded-xl p-1">
                      <textarea
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="text-sm text-gray-500 w-full p-2 rounded-xl bg-white outline-none"
                        placeholder="Description"
                      />
                    </div>
                  </div>

                  <div className="py-6 px-12 bg-white rounded-b-xl">
                    <h3 className="text-xl font-semibold pt-2 pb-4">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <input
                        placeholder="Start Time"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                      <input
                        placeholder="End Time"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                      <input
                        placeholder="Speaker"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                      <input
                        placeholder="Event Type"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                      <input
                        placeholder="Staff Number"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                      <input
                        placeholder="Budget"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                      <input
                        placeholder="Sponsor Benefits"
                        className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266] placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <CustomButton className="bg-[#3D50FF] w-full py-3 text-white rounded-xl mt-4 font-bold">
                        + Create Event
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Event Table (unchanged) */}
                <div className="bg-[#3D50FF] text-white text-xl font-bold px-4 py-4 rounded-t-2xl">
                  {selectedEventType === 'myEvents' ? 'My Events' : 'Other Events'}
                </div>
                <div className="overflow-x-auto flex-grow bg-white rounded-b-2xl">
                  <table className="min-w-full text-sm text-[#273266]">
                    <thead className="bg-[#F4F6F8] text-left">
                      <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Speaker</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Organizer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.map((p, idx) => (
                        <tr
                          key={idx}
                          className="border-b cursor-pointer hover:bg-gray-100"
                          onClick={() => navigate('/event/event-details')}
                        >
                          <td className="px-4 py-3">{p.title}</td>
                          <td className="px-4 py-3">{p.speaker}</td>
                          <td className="px-4 py-3">{p.date}</td>
                          <td className="px-4 py-3">
                            <Badge
                              label={p.type}
                              className={`${
                                p.type === 'virtual'
                                  ? 'bg-blue-100 text-blue-600'
                                  : p.type === 'in-person'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-purple-100 text-purple-600'
                              } px-3 py-1 text-xs`}
                            />
                          </td>
                          <td className="px-4 py-3">{p.location}</td>
                          <td className="px-4 py-3">{p.organizer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export { Events };
