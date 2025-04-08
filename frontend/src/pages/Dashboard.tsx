import { useEffect, useState } from 'react';
import { Main } from '../layouts/Main';
import Sidebar from '../components/Sidebar';
import dashboardGraphic from '../assets/dashboard-graphic.png';
import Badge from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/backend/event';
import { FrontEndRoutes } from './routes';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { CompanyAccount, UserAccount } from '../types/account';
import { EventResponseDTO } from '../types/event';
import { userService } from '../services/backend/user';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventResponseDTO[]>([]);

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
        
        // const fetchedEvents = response.map((event: EventResponseDTO) => ({
        //   ...event,
        //   tags: ['NEW!'], // Default tags
        // }));
        const fetchedEvents = await Promise.all(
          response.map(async (event: EventResponseDTO) => {
            const speaker = await userService.getUserByEmail(event.speaker); // Fetch speaker details
            console.log('Speaker:', speaker); // Log the fetched speaker details
            return {
              ...event,
              speaker: speaker.firstName + ' ' + speaker.lastName,
              tags: ['NEW!'],
            };
          })
        );
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  
  const account = useAccountInfo();

  // LOGIC FOR EACH USERS.
  console.log('is company:', account instanceof CompanyAccount);
  console.log('is user:', account instanceof UserAccount);
  if (account instanceof UserAccount) {
    console.log('User account role:', account.role);
  }
  // LOGIC FOR EACH USERS.

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

          {/*  */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow mb-8">
            <div>
              {account instanceof UserAccount ? (
                <>
                  <p className="text-sm text-[#637381]">
                    My Role /{' '}
                    <Badge
                      label={account.role}
                      display="inline-block"
                      className="bg-white text-center w-fit px-3 py-1 text-xs shadow"
                    />
                  </p>
                  {account.role === 'EventOrganizer' ? (
                    <>
                      <h2 className="text-3xl font-extrabold text-[#273266] mt-2">
                        Be a Great Event Organizer
                      </h2>
                      <p className="text-[#637381] mt-2 max-w-lg">
                        Plan, manage, and optimize events with innovative tools for outstanding
                        experiences.
                      </p>
                    </>
                  ) : account.role === 'Learner' ? (
                    <>
                      <h2 className="text-3xl font-extrabold text-[#273266] mt-2">
                        Discover Your Next Event
                      </h2>
                      <p className="text-[#637381] mt-2 max-w-lg">
                        Explore events curated for your interests and join experiences that inspire
                        you.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-extrabold text-[#273266] mt-2">
                        Welcome to Your Dashboard
                      </h2>
                      <p className="text-[#637381] mt-2 max-w-lg">
                        Stay updated with the latest events and personalized recommendations.
                      </p>
                    </>
                  )}
                </>
              ) : account instanceof CompanyAccount ? (
                <>
                  <p className="text-sm text-[#637381]">
                    Company Account /{' '}
                    <Badge
                      label="Company"
                      display="inline-block"
                      className="bg-white text-center w-fit px-3 py-1 text-xs shadow"
                    />
                  </p>
                  <h2 className="text-3xl font-extrabold text-[#273266] mt-2">
                    Manage Your Company Events
                  </h2>
                  <p className="text-[#637381] mt-2 max-w-lg">
                    Leverage powerful tools to streamline event management and boost audience
                    engagement.
                  </p>
                </>
              ) : (
                // Fallback for other account types
                <p className="text-sm text-[#637381]">Welcome to your dashboard.</p>
              )}
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
                    {/* {event.tags.map((tag: string) => (
                      <Badge key={tag} label={tag} className="bg-white px-3 py-1 text-xs shadow" />
                    ))} */}
                    <Badge key="NEW!" label="NEW!" className="bg-red px-3 py-1 text-xs shadow" />
                    <Badge key={event.locationType} label={event.locationType} className="bg-[#273266] text-white px-3 py-1 text-xs shadow" />
                  </div>
                </div>
              ))}
              {/* DUMMY PR TO ALLOW USERS TO JOIN STREAMERS, PLEASE DELETE LATER */}
              <div
                key={"67e48cfee48b2a4d0439edererw"}
                className="bg-[#EAF0FF] p-4 rounded-xl shadow cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(FrontEndRoutes.EventDetails.replace(':id', "67e48cfee48b2a4d0439edererw"))}
              >
                <div className="flex items-center gap-2 text-sm text-[#273266] mb-2">
                  📅 <span><b>Data Fabrication Workshop</b></span>
                </div>
                <p className="text-sm text-[#637381]">
                  Master the art of generating realistic fake data for testing, simulations, and educational purposes using modern tools and techniques
                </p>
                <p className="mt-2 text-sm font-medium text-[#273266]">
                  <span className="text-[#637381]">👤 Speaker:</span> Nicolas MacBeth
                </p>
                <p className="text-sm text-[#637381]">
                  📅 Date: May 15th, 2025 at 4:00 PM
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* {event.tags.map((tag: string) => (
                    <Badge key={tag} label={tag} className="bg-white px-3 py-1 text-xs shadow" />
                  ))} */}
                  <Badge key="NEW!" label="NEW!" className="bg-red px-3 py-1 text-xs shadow" />
                  <Badge key="Hybrid" label="Hybrid" className="bg-[#273266] text-white px-3 py-1 text-xs shadow" />
                </div>
              </div>
              

            </div>
          </div>
          {account instanceof CompanyAccount && (
            <div className="flex items-center justify-center bg-white p-6 rounded-2xl shadow mt-8">
              <div className="text-center">
                <p className="text-[#637381]">
                  Are you a sponsor?{' '}
                  <a href="/signup/sponsor" className="text-blue-600 hover:underline">
                    Sign up here
                  </a>
                  .
                </p>
                <p className="text-[#637381] mt-2">
                  Want to organize events?{' '}
                  <a href="/signup/eventorganizer" className="text-blue-600 hover:underline">
                    Join us as an organizer
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Main>
  );
};
