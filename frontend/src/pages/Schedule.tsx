import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import { PageHeader } from '../components/PageHeader';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FrontEndRoutes } from './routes';
import { EventResponseDTO } from '../types/event';
import { userService } from '../services/backend/user';
import { useAccountInfo } from '../hooks/useAccountInfo';


export const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventResponseDTO[]>([]);
  const account = useAccountInfo();
  const accountId = account?._id;

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events for account ID:', accountId);
        const eventsRegisteredByUser = await userService.getEventsRegisteredByUser(accountId || '');

        const fetchedEvents = await Promise.all(
          eventsRegisteredByUser.map(async (event: EventResponseDTO) => {
            const speaker = await userService.getUserByEmail(event.speaker); // Fetch speaker details
            return {
              ...event,
              speaker: speaker.firstName + ' ' + speaker.lastName,
            };
          })
        );

        // Sort events by startDateAndTime in ascending order
        fetchedEvents.sort((a, b) => new Date(a.startDateAndTime).getTime() - new Date(b.startDateAndTime).getTime());

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [account]);

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        <PageHeader pageName="Schedule" />

        {/* Hero Section */}
        <div className="bg-[#3D50FF] text-white px-8 py-8 rounded-2xl shadow space-y-2">
          <h2 className="text-2xl font-bold">My Schedule</h2>
          <p className="text-sm text-[#C8D1FF] max-w-2xl">
            See all of the upcoming events you have registered for.
          </p>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          <div className="flex-col bg-white p-8 rounded-2xl shadow space-y-6">
            {/* DUMMY PR TO ALLOW USERS TO JOIN STREAMERS, PLEASE DELETE LATER */}
            <div
              key={'67e48cfee48b2a4d0439edererw'}
              className="bg-[#EAF0FF] p-4 rounded-xl shadow cursor-pointer hover:bg-gray-100"
              onClick={() =>
                navigate(FrontEndRoutes.EventDetails.replace(':id', '67e48cfee48b2a4d0439edererw'))
              }
            >
              <div className="flex items-center gap-2 text-sm text-[#273266] mb-2">
                📅{' '}
                <span>
                  <b>Data Fabrication Workshop</b>
                </span>
              </div>
              <p className="text-sm text-[#637381]">
                Master the art of generating realistic fake data for testing, simulations, and
                educational purposes using modern tools and techniques
              </p>
              <p className="mt-2 text-sm font-medium text-[#273266]">
                <span className="text-[#637381]">👤 Speaker:</span> Nicolas MacBeth
              </p>
              <p className="text-sm text-[#637381]">📅 Date: May 15th, 2025 at 4:00 PM</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge key="NEW!" label="NEW!" className="bg-red px-3 py-1 text-xs shadow" />
                <Badge
                  key="Hybrid"
                  label="Hybrid"
                  className="bg-[#273266] text-white px-3 py-1 text-xs shadow"
                />
              </div>
            </div>
            <hr className="my-4 border-gray-300" />
            {events.map((event, idx) => (
              <div key={idx}>
                <div
                  className="bg-[#EAF0FF] p-4 rounded-xl shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(FrontEndRoutes.EventDetails.replace(':id', event._id))}
                >
                  <div className="flex items-center gap-2 text-sm text-[#273266] mb-2">
                    📅{' '}
                    <span>
                      <b>{event.name}</b>
                    </span>
                  </div>
                  <p className="text-sm text-[#637381]">{event.description}</p>
                  <p className="mt-2 text-sm font-medium text-[#273266]">
                    <span className="text-[#637381]">👤 Speaker:</span> {event.speaker}
                  </p>
                  <p className="text-sm text-[#637381]">
                    📅 Date:{' '}
                    {event.startDateAndTime
                      ? new Date(event.startDateAndTime).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
                      : ''}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge key={event.price} label={`$${event.price}`} className="bg-red px-3 py-1 text-xs shadow" />
                    <Badge
                      key={event.locationType}
                      label={event.locationType}
                      className="bg-[#273266] text-white px-3 py-1 text-xs shadow"
                    />
                  </div>
                </div>
                {idx < events.length - 1 && <hr className="my-4 border-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
