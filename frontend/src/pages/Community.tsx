import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Community = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const discussions = [
    {
      title: 'Best Tools for Automations???',
      body: `In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. 
        Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget 
        sociis adipiscing eget donec ultricies nibh tristique. Adipiscing dui orci 
        ac purus lacus, nulla auctor. Ultrices sit leo diam etiam cras fermentum.`,
      replies: 11,
      likes: 118,
    },
    {
      title: 'How to Boost Engagement in Virtual Events?',
      body: `Looking to share ideas and tools that help attendees stay interactive and engaged. 
        Let’s talk polls, Q&As, gamification, breakout sessions, and more.`,
      replies: 8,
      likes: 74,
    },
    {
      title: 'Top CRM Tools for Event Organizers?',
      body: `I’ve tried HubSpot and Salesforce, but looking for CRM options that integrate smoothly 
        with event management platforms. Any recommendations?`,
      replies: 14,
      likes: 96,
    },
  ];

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[#3D50FF] bg-white px-6 py-2 rounded-full shadow">
            Communities
          </h1>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#3D50FF] text-white px-8 py-8 rounded-2xl shadow space-y-2">
          <h2 className="text-2xl font-bold">Communities and Networking</h2>
          <p className="text-sm text-[#C8D1FF] max-w-2xl">
            Plan, manage, and optimize events with ease. Powerful tools for seamless organization
            and interactive experiences.
          </p>
        </div>

        {/* Discussions */}
        <section>
          <h3 className="text-xl font-bold text-[#273266] mb-4">Discussion</h3>
          <div className="space-y-4">
            {discussions.map((post, index) => (
              <Link
                to="/community/discussion"
                key={index}
                className="block bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition"
              >
                <h4 className="font-semibold text-[#273266] mb-2">{post.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.body}</p>
                <p className="text-xs text-gray-400">
                  {post.replies} replies · {post.likes} likes
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export { Community };
