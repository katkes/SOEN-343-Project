import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { PageHeader } from '../components/PageHeader';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export const EventConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event } = state || {};
  
  const displayEvent = {
    date: event?.date || 'April 4th 2025',
    location: event?.location || 'SGW Concordia',
    title: event?.title || 'Security Workshop',
    type: event?.type || 'Seminar'
  };

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <PageHeader pageName="Checkout" />

        {/* Confirmation Banner */}
        <div className="bg-[#3D50FF] text-white rounded-t-xl px-12 py-10 shadow relative">
          <div className="text-sm flex gap-6 font-medium">
            <p>📅 {displayEvent.date}</p>
            <p>📍 {displayEvent.location}</p>
          </div>
          <h1 className="text-4xl font-bold pt-2">{displayEvent.title}</h1>
          <p className="text-[#C8D1FF] text-lg font-medium pt-1">{displayEvent.type}</p>
        </div>

        {/* Confirmation Message */}
        <div className="bg-white rounded-b-xl px-10 py-16 text-center shadow">
          <CheckCircleIcon className="w-28 h-28 text-[#B3CDFF] mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-[#273266] mb-4">
            You're Successfully Registered for this Event!
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
