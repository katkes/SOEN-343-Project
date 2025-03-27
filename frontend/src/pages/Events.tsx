import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import CreateEventForm from '../components/CreateEventForm';
import { PageHeader } from '../components/PageHeader';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { CompanyAccount, UserAccount } from '../types/account';
import { eventService } from '../services/backend/event';
import { EventResponseDTO } from '../types/event';

// TO-DO: For now, it's called My Events, but it's actually showcasing all events. We will need to add bridging tables in the future to showcase all the events associated with the logged in user.
const Events = () => {
  const account = useAccountInfo();
  const isEventCreator =
    account instanceof CompanyAccount ||
    (account instanceof UserAccount &&
      (['EventOrganizer', 'Sponsor', 'Admin'].includes(account.role as string)));

  const [events, setEvents] = useState<EventResponseDTO[]>([]);
  const [creatingNewEvent, setCreatingNewEvent] = useState(false);
  const navigate = useNavigate();

  const [selectedEventType, setSelectedEventType] = useState<'myEvents' | 'otherEvents' | null>(
    'myEvents'
  );

  // const allEvents = [
  //   {
  //     title: 'Security Workshop',
  //     speaker: 'Jane Doe',
  //     date: 'April 4th 2025',
  //     location: 'SGW Campus',
  //     organizer: 'MegaSoft Inc',
  //     type: 'hybrid',
  //     isUserRegistered: true,
  //   },
  //   {
  //     title: 'AI Conference',
  //     speaker: 'John Smith',
  //     date: 'May 10th 2025',
  //     location: 'Loyola Campus',
  //     organizer: 'TechWorld',
  //     type: 'in-person',
  //     isUserRegistered: true,
  //   },
  //   {
  //     title: 'Cloud Computing Seminar',
  //     speaker: 'Alice Johnson',
  //     date: 'June 15th 2025',
  //     location: 'Online',
  //     organizer: 'CloudTech',
  //     type: 'virtual',
  //     isUserRegistered: true,
  //   },
  //   {
  //     title: 'Cybersecurity Meetup',
  //     speaker: 'Bob Brown',
  //     date: 'July 20th 2025',
  //     location: 'SGW Campus',
  //     organizer: 'SecureNet',
  //     type: 'hybrid',
  //     isUserRegistered: false,
  //   },
  // ];

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        const fetchedEvents = response.map((event: EventResponseDTO) => ({
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
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Top header */}
        <PageHeader pageName="Events" />

        {/* Event Tabs */}
        <div className="flex flex-col">
          <div className="flex flex-1/5 gap-3 ">
            <CustomButton
              className={`${selectedEventType === 'myEvents' && !creatingNewEvent ? 'bg-[#273266]' : 'bg-[#3D50FF]'} text-white text-sm font-semibold p-4 rounded-xl mb-4`}
              width="w-[200px]"
              onClick={() => {
                setSelectedEventType('myEvents');
                setCreatingNewEvent(false);
              }}
            >
              My Events
            </CustomButton>
            { !isEventCreator && (
              <CustomButton
                className={`${selectedEventType === 'otherEvents' && !creatingNewEvent ? 'bg-[#273266]' : 'bg-[#3D50FF]'} text-white text-sm font-semibold p-4 rounded-xl mb-4`}
                width="w-[200px]"
                onClick={() => {
                  setSelectedEventType('otherEvents');
                  setCreatingNewEvent(false);
                }}
              >
                Other Events
              </CustomButton>
            )}
            { isEventCreator && (
              <CustomButton
                className={`${creatingNewEvent ? 'bg-[#273266]' : 'bg-[#3D50FF]'} text-white text-sm font-semibold p-4 rounded-xl mb-4`}
                width="w-[200px]"
                onClick={() => {
                  setCreatingNewEvent(true);
                  setSelectedEventType(null); // Reset when creating a new event
                }}
              >
                Create New Event +
              </CustomButton>
            )}
          </div>

          {/* Create New Event Form */}
          <div className=" flex-4/5 overflow-hidden py-3">
            {creatingNewEvent ? (
              <CreateEventForm />
            ) : (
              <>
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
                      {events.map((event, idx) => (
                        <tr
                          key={idx}
                          className="border-b cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            navigate(`/event/${event._id}/details`, {
                              state: {
                                event,
                                editable: isEventCreator && selectedEventType === 'myEvents'
                              },
                            })
                          }
                        >
                          <td className="px-4 py-3">{event.name}</td>
                          <td className="px-4 py-3">Nicolas MacBeth</td>
                          <td className="px-4 py-3">{event?.startDateAndTime
                            ? new Date(event.startDateAndTime).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            })
                            : ''} </td>
                          <td className="px-4 py-3">
                            <Badge
                              label={event.locationType}
                              className={`${
                                event.locationType === 'virtual'
                                  ? 'bg-blue-100 text-blue-600'
                                  : event.locationType === 'in-person'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-purple-100 text-purple-600'
                              } px-3 py-1 text-xs`}
                            />
                          </td>
                          <td className="px-4 py-3">{event.location}</td>
                          <td className="px-4 py-3">Google</td>
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
