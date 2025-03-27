import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import CreateEventForm from '../components/CreateEventForm';
import { PageHeader } from '../components/PageHeader';

export const userRole = 'organizer';


const Events = () => {
  const [creatingNewEvent, setCreatingNewEvent] = useState(false);
  const navigate = useNavigate();

  const [selectedEventType, setSelectedEventType] = useState<'myEvents' | 'otherEvents' | null>(
    'myEvents'
  );

  const isEventCreator = (userRole as string) !== 'attendee';

  const allEvents = [
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
      isUserRegistered: true,
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

  const fileredEvents = allEvents.filter((event) => {
    if (selectedEventType === 'myEvents') {
      return event.isUserRegistered;
    }
    return !event.isUserRegistered;
  });

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
                      {fileredEvents.map((event, idx) => (
                        <tr
                          key={idx}
                          className="border-b cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            navigate('/event/event-details', {
                              state: {
                                registered: event.isUserRegistered,
                                editable: isEventCreator && selectedEventType === 'myEvents',
                              },
                            })
                          }
                        >
                          <td className="px-4 py-3">{event.title}</td>
                          <td className="px-4 py-3">{event.speaker}</td>
                          <td className="px-4 py-3">{event.date}</td>
                          <td className="px-4 py-3">
                            <Badge
                              label={event.type}
                              className={`${
                                event.type === 'virtual'
                                  ? 'bg-blue-100 text-blue-600'
                                  : event.type === 'in-person'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-purple-100 text-purple-600'
                              } px-3 py-1 text-xs`}
                            />
                          </td>
                          <td className="px-4 py-3">{event.location}</td>
                          <td className="px-4 py-3">{event.organizer}</td>
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
