import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useEffect, useState } from 'react';
import { EventResponseDTO } from '../types/event';
import { eventService } from '../services/backend/event';
import { useAccountInfo } from '../hooks/useAccountInfo';
import CheckoutForm from '../components/CheckoutForm';

export const EventRegistration = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventResponseDTO>();
  const account = useAccountInfo();

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

  if (!event || !account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Registration" />

        {/* Event Info Banner */}
        <div className="bg-[#3D50FF] text-white rounded-t-xl px-12 py-10 shadow">
          <div className="text-sm flex gap-6 font-medium">
            <p>
              📅{' '}
              {event.startDateAndTime
                ? new Date(event.startDateAndTime).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
                : ''}
            </p>
            <p>📍 {event.location} </p>
          </div>
          <h1 className="text-4xl font-bold py-2">{event.name}</h1>
          <p className="text-[#C8D1FF]">{event.description}</p>
        </div>

        {/* Embedded Checkout Form */}
        <div className="bg-white rounded-b-xl px-10 pb-10 pt-5 shadow mx-auto -mt-6">
          <h2 className="text-xl font-semibold mb-6">Complete Your Payment</h2>
          <CheckoutForm
            eventId={event._id}
            userId={account._id}
            amount={Math.round(event.price * 100)}
            eventName={event.name} 
            email = {account.email}       
            eventDate = {new Date(event.startDateAndTime).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}   
            location = {event.location}
          />
        </div>
      </main>
    </div>
  );
};
