import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import EventForm, { userRole } from '../components/EventForm';
import { eventService } from '../services/backend/event';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);

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
          <div>Loading...</div>
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