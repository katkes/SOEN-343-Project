import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import CreateEventForm from '../components/CreateEventForm';
import { PageHeader } from '../components/PageHeader';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { UserAccount } from '../types/account';
import { eventService } from '../services/backend/event';
import { EventResponseDTO } from '../types/event';
import { userService } from '../services/backend/user'; // Import userService

// TO-DO: For now, it's called My Events, but it's actually showcasing all events. We will need to add bridging tables in the future to showcase all the events associated with the logged in user.
const Events = () => {
  const account = useAccountInfo();
  const isCompanyAccount = (account instanceof UserAccount && ['EventOrganizer', 'Sponsor'].includes(account.role as string))
  const isEventCreator = (account instanceof UserAccount && ['EventOrganizer', 'Admin'].includes(account.role as string))
  console.log('isCompanyAccount:', isCompanyAccount);


  const [events, setEvents] = useState<EventResponseDTO[]>([]);
  const [companyEvents, setCompanyEvents] = useState<EventResponseDTO[]>([]);
  const [creatingNewEvent, setCreatingNewEvent] = useState(false);
  const navigate = useNavigate();

  const [selectedEventType, setSelectedEventType] = useState<'allEvents' | 'companyEvents' | null>(
    'allEvents'
  );

  // Fetch events from the backend
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const allEvents = await eventService.getAllEvents();
        
        const eventsWithSpeakers = await Promise.all(
          allEvents.map(async (event: EventResponseDTO) => {
            const speaker = await userService.getUserByEmail(event.speaker); // Fetch speaker details
            return {
              ...event,
              speaker: speaker.firstName + ' ' + speaker.lastName,
            };
          })
        );
        setEvents(eventsWithSpeakers); // Store all events

        // If the user is a company account, filter events by company name
        
        if (isCompanyAccount) {
          console.log("reach")
          const companySpecificEvents = eventsWithSpeakers.filter(
            (event) => (event.sponsoredBy === account.companyName || event.organizedBy === account.companyName) // Filter events by company name
          );
          console.log('Company-specific events:', companySpecificEvents);
          setCompanyEvents(companySpecificEvents); // Store company-specific events
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchAllEvents();
  }, [isCompanyAccount, account]);

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
              className={`${selectedEventType === 'allEvents' && !creatingNewEvent ? 'bg-[#273266]' : 'bg-[#3D50FF]'} text-white text-sm font-semibold p-4 rounded-xl mb-4`}
              width="w-[200px]"
              onClick={() => {
                setSelectedEventType('allEvents');
                setCreatingNewEvent(false);
              }}
            >
              All Events
            </CustomButton>
            {isCompanyAccount && (
              <CustomButton
                className={`${selectedEventType === 'companyEvents' && !creatingNewEvent ? 'bg-[#273266]' : 'bg-[#3D50FF]'} text-white text-sm font-semibold p-4 rounded-xl mb-4`}
                width="w-[200px]"
                onClick={() => {
                  setSelectedEventType('companyEvents');
                  setCreatingNewEvent(false);
                }}
              >
                My Company Events
              </CustomButton>
            )}
            {isEventCreator && (
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
                {/* Table Header */}
                <div className="bg-[#3D50FF] text-white text-xl font-bold px-4 py-4 rounded-t-2xl">
                  {(() => {
                    if (selectedEventType === 'allEvents') {
                      return 'All Events';
                    } else {
                      return 'My Company Events';
                    }
                  })()}
                </div>

                {/* Table Contents */}
                <div className="overflow-x-auto flex-grow bg-white rounded-b-2xl">
                  <table className="min-w-full text-sm text-[#273266]">
                    <thead className="bg-[#F4F6F8] text-left">
                      <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Speaker</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Duration</th>
                        <th className="px-4 py-3 text-center">Organizer</th>
                        <th className="px-4 py-3 text-center">Sponsor</th>
                        <th className="px-4 py-3 text-center">Price</th>
                        
                      </tr>
                    </thead>
                    <tbody>

                      {/* Map through events and display them in the table */}
                      {(selectedEventType === 'allEvents' ? events : companyEvents).map((event, idx) => (
                        console.log('Event:', event._id),
                        <tr
                          key={idx}
                          className="border-b cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            navigate(`/event/${event._id}/details`, {
                              state: {
                                event,
                                editable: isEventCreator && selectedEventType === 'allEvents',
                              },
                            })
                          }
                        >
                          <td className="px-4 py-3">{event.name}</td>
                          <td className="px-4 py-3">{event.speaker}</td>
                          <td className="px-4 py-3">
                            {event?.startDateAndTime
                              ? new Date(event.startDateAndTime).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })
                              : ''}
                          </td>
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
                          <td className="px-4 py-3">{`${event.timeDurationInMinutes} mins`}</td>
                          <td className="px-4 py-3 text-center">{event.organizedBy}</td>
                          <td className="px-4 py-3 text-center">{event.sponsoredBy || "None"}</td>
                          <td className="px-4 py-3 text-center">{`$${event.price}`}</td>
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
