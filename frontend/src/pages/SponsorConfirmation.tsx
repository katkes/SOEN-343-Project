import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { PageHeader } from '../components/PageHeader';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { EventResponseDTO } from '../types/event';
import { eventService } from '../services/backend/event';

export const SponsorConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventResponseDTO>();
  const navigate = useNavigate();

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

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <PageHeader pageName="Checkout" />

        {/* Confirmation Banner */}
        <div className="bg-[#3D50FF] text-white rounded-t-xl px-12 py-10 shadow relative">
          <div className="text-sm flex gap-6 font-medium">
            <p>📅 {event?.startDateAndTime
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
            <p>📍 {event?.location} </p>
          </div>
          <h1 className="text-4xl font-bold pt-2">{event?.name}</h1>
          <p className="text-[#C8D1FF] text-lg font-medium pt-1">{event?.description}</p>
        </div>

        {/* Confirmation Message */}
        <div className="bg-white rounded-b-xl px-10 py-16 text-center shadow">
          <CheckCircleIcon className="w-28 h-28 text-[#B3CDFF] mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-[#273266] mb-4">
            You have Successfully Sponsored this Event!
          </h2>
          <CustomButton
            className="bg-[#3D50FF] text-white px-10 py-3 rounded-xl font-bold mt-6"
            onClick={() => navigate('/events')}
          >
            Done
          </CustomButton>
        </div>
      </main>
    </div>
  );
};
