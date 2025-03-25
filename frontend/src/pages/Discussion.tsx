import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Avatar from '../assets/avatar.png'; // Replace with actual image imports if needed
import CustomButton from '../components/CustomButton';

const Discussion = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const replies = Array(5).fill({
    name: 'Ralph Edwards',
    date: 'Aug 19, 2021',
    text: `In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. 
      Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget 
      sociis adipiscing eget donec ultricies nibh tristique.`,
  });

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CustomButton
              onClick={() => navigate(-1)}
              disableDefaults
              className="bg-white px-2 py-1 rounded-full text-[#273266] font-bold shadow"
            >
              ◀
            </CustomButton>
            <h1 className="text-4xl font-extrabold text-[#3D50FF] bg-white px-6 py-2 rounded-full shadow">
              Discussion
            </h1>
          </div>

          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#3D50FF] text-white px-8 py-8 rounded-2xl shadow space-y-2 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Best Tools for Automations???</h2>
          <CustomButton
            className="bg-white text-[#273266] font-semibold px-4 py-2 rounded-xl text-sm"
            onClick={() => navigate('/community')}
          >
            ← Back to Communities
          </CustomButton>
        </div>

        {/* Discussion Post */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex items-center space-x-4">
            <img src={Avatar} alt="Author" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-[#273266]">Albert Flores</p>
              <p className="text-lg font-semibold">Best Tools for Automations???</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra
            vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec
            ultricies nibh tristique. Adipiscing dui orci ac purus lacus, nulla auctor. Ultrices sit
            leo diam etiam cras fermentum.
          </p>
          <div className="flex text-sm text-gray-400 justify-between">
            <span>Aug 19, 2021</span>
            <div className="flex space-x-4">
              <span>💬 5</span>
              <span>❤️ 5</span>
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="bg-white p-6 rounded-xl shadow flex space-x-4 items-start">
          <img src={Avatar} alt="You" className="w-10 h-10 rounded-full mt-1" />
          <div className="flex flex-col flex-1 space-y-2">
            <textarea
              placeholder="Add a comment"
              className="w-full p-3 rounded-xl border border-gray-300 text-sm resize-none"
              rows={2}
            />
            <div className="flex justify-end">
              <CustomButton className="bg-[#3D50FF] text-white font-bold px-4 py-2 rounded-xl text-sm">
                Post
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4">
          {replies.map((reply, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow border border-gray-100">
              <div className="flex items-start space-x-4">
                <img src={Avatar} alt={reply.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-[#273266]">{reply.name}</p>
                    <span className="text-xs text-gray-400">{reply.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{reply.text}</p>
                  <div className="mt-2 text-xs text-gray-400 flex gap-4">
                    <span>💬 3</span>
                    <span>❤️ 5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export { Discussion };
