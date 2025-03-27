import { useEffect, useState } from 'react';
import { Main } from '../layouts/Main';
import Sidebar from '../components/Sidebar';
import dashboardGraphic from '../assets/dashboard-graphic.png';
import Badge from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { eventService } from '../services/backend/event';
import { FrontEndRoutes } from './routes';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        const fetchedEvents = response.map((event: any) => ({
          ...event,
          speaker: 'Test Speaker', // Default speaker
          tags: ['NEW!'], // Default tags
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);


  return (
    <Main>
      <div className="flex h-screen overflow-hidden bg-[#EAF5FF]">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-[#EAF5FF] p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-[#273266] bg-white px-6 py-2 rounded-full shadow">
              Dashboard
            </h1>
            <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
              {today}
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow mb-8">
            <div>
              <p className="text-sm text-[#637381]">
                My Role /{' '}
                <Badge
                  label={'Organizer'}
                  display="inline-block"
                  className="bg-white text-center w-fit px-3 py-1 text-xs shadow"
                />
              </p>
              <h2 className="text-3xl font-extrabold text-[#273266] mt-2">
                Be a Great Event Organizer
              </h2>
              <p className="text-[#637381] mt-2 max-w-lg">
                Plan, manage, and optimize events with ease—powerful tools for seamless organization
                and interactive experiences.
              </p>
            </div>
            <img
              src={dashboardGraphic}
              alt="Dashboard Visual"
              className="w-72 h-auto hidden md:block"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#273266]">Upcoming Events</h3>
              <button className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
                Show All <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-[#EAF0FF] p-4 rounded-xl shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(FrontEndRoutes.EventDetails.replace(':id', event._id))}
                >
                  <div className="flex items-center gap-2 text-sm text-[#273266] mb-2">
                    📅 <span><b>{event.name}</b></span>
                  </div>
                  <p className="text-sm text-[#637381]">
                    {event.description}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#273266]">
                    <span className="text-[#637381]">👤 Speaker:</span> {event.speaker}
                  </p>
                  <p className="text-sm text-[#637381]">📅 Date: {event.startDateAndTime}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* {event.tags.map((tag: string) => (
                      <Badge key={tag} label={tag} className="bg-white px-3 py-1 text-xs shadow" />
                    ))} */}
                    <Badge key="NEW!" label="NEW!" className="bg-red px-3 py-1 text-xs shadow" />
                    <Badge key={event.locationType} label={event.locationType} className="bg-[#273266] text-white px-3 py-1 text-xs shadow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
