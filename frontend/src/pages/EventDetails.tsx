import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import EventForm, { userRole } from '../components/EventForm';
import { eventService } from '../services/backend/event';
import { EventResponseDTO } from '../types/event';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventResponseDTO>();

  const fakeEvent = {
    _id: '67e48cfee48b2a4d0439edererw',
    name: "Data Fabrication Workshop",
    description: "Master the art of generating realistic fake data for testing, simulations, and educational purposes using modern tools and techniques",
    speaker: "Nicolas MacBeth",
    location: "Concordia University",
    locationType: "Hybrid",
    ticketsSold: 0,
    maxCapacity: 5000,
    startDateAndTime: new Date('2025-05-15T16:00:00Z'), // Example date
    timeDurationInMinutes: 60,
    price: 29.99,
    sponsoredBy: "Tech Innovations Inc.",
    organizedBy: "Google"
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!id) {
          throw new Error('Event ID is undefined');
        }
        const responseJson = await eventService.getEventById(id);
        setEvent(responseJson); // Set the event details
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
          <PageHeader pageName="Event Details" />
          <EventForm
            event={fakeEvent} // Pass the fetched event data
            role={userRole}
            editable={false} // Set to true if you want the form to be editable
            onSubmit={() => console.log('Event updated!')}
            registered={true} // Set to true if the user is registered for the event
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Details" />
        <EventForm
          event={event} // Pass the fetched event data
          role={userRole}
          editable={false} // Set to true if you want the form to be editable
          onSubmit={() => console.log('Event updated!')}
        />
      </main>
    </div>
  );
};

export { EventDetails };