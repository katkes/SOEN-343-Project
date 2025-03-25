import Sidebar from '../components/Sidebar';
import { CalendarDaysIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import Badge from '../components/Badge';
import { Link } from 'react-router-dom';

const Schedule = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const events = [
    {
      title: 'Security Workshop',
      description: 'Write an amazing description in this dedicated card section.',
      speaker: 'Daniel Lam',
      location: 'Hybrid/SGW Campus',
      date: 'April 4th 2025',
      tags: ['Hot Topic', 'Automation', 'Nonproductive'],
    },
    {
      title: 'Security Workshop',
      description: 'Write an amazing description in this dedicated card section.',
      speaker: 'Daniel Lam',
      location: 'Hybrid/SGW Campus',
      date: 'April 4th 2025',
      tags: ['Hot Topic', 'Automation', 'Nonproductive'],
    },
  ];

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[#3D50FF] bg-white px-6 py-2 rounded-full shadow">
            Schedule
          </h1>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#3D50FF] text-white px-8 py-8 rounded-2xl shadow space-y-2">
          <h2 className="text-2xl font-bold">Schedule</h2>
          <p className="text-sm text-[#C8D1FF] max-w-2xl">
            See all of the upcoming events you have registered for
          </p>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <Link key={index} to={`/event/event-details`}>
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="bg-[#DFF0FF] py-2 px-4">
                  <CalendarDaysIcon className="w-6 h-6 text-[#3D50FF]" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-[#273266]">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>

                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-1 text-[#273266]">
                      <UserIcon className="w-4 h-4" />
                      <span className="font-semibold">Speaker:</span> {event.speaker}
                    </p>
                    <p className="flex items-center gap-1 text-[#273266]">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="font-semibold">Location:</span> {event.location}
                    </p>
                    <p className="flex items-center gap-1 text-[#273266]">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span className="font-semibold">Date:</span> {event.date}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {event.tags.map((tag, i) => (
                      <Badge key={i} label={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export { Schedule };
