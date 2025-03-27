import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetails = () => {
  // State to store event details
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);


  // Updated initial state with dummy data
  const [eventTitle, setEventTitle] = useState('AI Conference 2025');
  const [eventDescription, setEventDescription] = useState(
    'Join us for a conference on Artificial Intelligence.'
  );
  const [eventDate, setEventDate] = useState('04-04-2025');
  const [eventLocation, setEventLocation] = useState('SGW Concordia');
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // // const response = await axios.get(`http://localhost:3000/api/event/${id}`);
        // setEvent(response.data); // Set the event details
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (!event) {
    return (
      <div className="flex bg-[#EAF5FF]">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <div>Loading...</div>
        </main>
      </div>
    );
  };
  

  return (
    <div className="flex bg-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Top header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <CustomButton
                onClick={() => navigate(-1)}
                disableDefaults
                className="bg-white px-2 py-1 rounded-full text-[#273266] font-bold shadow"
              >
                ◀
              </CustomButton>
              <h1 className="text-4xl font-bold text-[#273266] bg-white px-4 py-2 rounded-full shadow">
                Events
              </h1>
            </div>
          </div>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Main content grid */}
        <div className="flex flex-col">
          {/* Right Panel */}
          <div className=" flex-4/5 overflow-hidden pb-6">
            {/* New Event Form */}
            <div className="text-[#273266]  rounded-xl shadow border-0.5">
              <div className="flex flex-col justify-center banner h-fit py-32 px-12 gap-8">
                {/* Back to Events Button */}
                <div className="flex flex-col md:flex-row gap-4 text-white text-sm font-medium">
                  <input
                    disabled
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                    placeholder="📅 dd-mm-yyyy"
                  />
                  <input
                    disabled
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="bg-transparent placeholder-gray-100 border-b border-white/50 focus:border-white outline-none w-fit"
                    placeholder="📍 Location"
                  />
                </div>

                <input
                  disabled
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="text-3xl font-bold text-white bg-transparent outline-none border-b-2 border-white/50 focus:border-white w-full max-w-md placeholder-gray-100"
                  placeholder="AI Conference"
                />

                <div className="bg-white w-2/5 rounded-xl p-1">
                  <textarea
                    disabled
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="text-sm text-gray-500 w-full p-2 rounded-xl bg-white outline-none"
                    placeholder="Description"
                  />
                </div>

                <div className="flex justify-between items-center w-full">
                  <CustomButton
                    className="bg-[#273266] text-white text-sm font-semibold px-4 py-2 rounded-xl"
                    onClick={() => navigate('/event/event-details/register')}
                  >
                    Register
                  </CustomButton>
                </div>
              </div>

              <div className="py-6 px-12 bg-white rounded-b-xl">
                <h3 className="text-xl font-semibold pt-2 pb-4">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    disabled
                    value="09:00 AM"
                    placeholder="Start Time"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                  <input
                    disabled
                    value="05:00 PM"
                    placeholder="End Time"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                  <input
                    disabled
                    value="John Doe"
                    placeholder="Speaker"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                  <input
                    disabled
                    value="Workshop"
                    placeholder="Event Type"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                  <input
                    disabled
                    value="42"
                    placeholder="Staff Number"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                  <input
                    disabled
                    value="$5000"
                    placeholder="Budget"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                  <input
                    disabled
                    value="Networking Opportunities"
                    placeholder="Sponsor Benefits"
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-gray-500 placeholder-gray-400"
                  />
                </div>

                <div>
                  <CustomButton
                    className="bg-[#4F52FF] w-full py-3 text-white rounded-xl mt-4 font-bold"
                    onClick={() => navigate('/event/event-details/register')}
                  >
                    Register
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { EventDetails };
