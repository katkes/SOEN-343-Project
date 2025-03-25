import Sidebar from '../components/Sidebar';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Notifications = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const notifications = [
    {
      message: 'Security Workshop Updated',
      date: 'March 26, 2023',
    },
    {
      message: 'Anthony Mad attended the same event as you. Check their profile!',
      date: 'March 26, 2023',
    },
    {
      message: 'Security Workshop Updated',
      date: 'March 26, 2023',
    },
    {
      message: 'Security Workshop Updated',
      date: 'March 26, 2023',
    },
    {
      message: 'Security Workshop Updated',
      date: 'March 26, 2023',
    },
    {
      message: 'Security Workshop Updated',
      date: 'March 26, 2023',
    },
  ];

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[#3D50FF] bg-white px-6 py-2 rounded-full shadow">
            Notifications
          </h1>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#3D50FF] text-white px-8 py-8 rounded-2xl shadow space-y-2">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-sm text-[#C8D1FF] max-w-2xl">
            Keep up with any updates from your peers or organizers
          </p>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl p-6 shadow space-y-4">
          <h3 className="text-xl font-bold text-black">Notifications</h3>

          {notifications.map((notif, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-300 w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-[#273266]">{notif.message}</p>
                  <p className="text-xs text-gray-400">{notif.date}</p>
                </div>
              </div>
              <button>
                <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export { Notifications };
