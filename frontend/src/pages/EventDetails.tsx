import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PageHeader } from '../components/PageHeader';
import EventForm from '../components/EventForm';

const EventDetails = () => {
  const location = useLocation();
  const { event } = location.state || {};

  return (
    <div className="flex bg-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Details" />
        <EventForm
          onSubmit={() => console.log('Event created/updated!')}
          eventTitle={event?.title || 'Tech Conference 2025'}
          eventDescription={event?.description || 'A conference about the latest in tech.'}
          eventDate={event?.date || '2025-04-15'}
          eventLocation={event?.location || 'New York City'}
          startTime={event?.startTime || '10:00 AM'}
          endTime={event?.endTime || '4:00 PM'}
          speakers={event?.speakers || [event?.speaker] || ['John Doe', 'Jane Smith']}
          address={event?.address || '456 Tech Street, NY'}
          registered={event?.isUserRegistered || false}
        />
      </main>
    </div>
  );
};

export { EventDetails };
