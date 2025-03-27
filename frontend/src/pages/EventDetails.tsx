import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PageHeader } from '../components/PageHeader';
import EventForm from '../components/EventForm';
import { userRole } from '../components/EventForm';

const EventDetails = () => {
  const location = useLocation();
  const { registered } = location.state || { registered: false };
  
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
