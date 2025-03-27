import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import EventForm, { userRole } from '../components/EventForm';
import { eventService } from '../services/backend/event';

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
  const location = useLocation();
  const { registered } = location.state || { registered: false };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

  // if (!event) {
  //   return (
  //     <div className="flex bg-[#EAF5FF]">
  //       <Sidebar />
  //       <main className="flex-1 p-6 space-y-6">
  //         <div>Loading...</div>
  //       </main>
  //     </div>
  //   );
  // };

  
  return (
    <div className="flex bg-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Details" />
        <EventForm 
          role={userRole} 
          onSubmit={() => console.log('Event created!')} 
          registered={registered}
        />
      </main>
    </div>
  );
};

export { EventDetails };
