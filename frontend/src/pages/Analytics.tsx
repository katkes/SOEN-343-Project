import Sidebar from '../components/Sidebar';

const Analytics = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex bg-[#EAF5FF]">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-[#273266] bg-white px-6 py-2 rounded-full shadow">
            Analytics
          </h1>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            <p className="text-gray-500">{currentDate}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Analytics };
