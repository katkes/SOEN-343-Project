import { Main } from '../layouts/Main';
import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import profilePic from '../assets/avatar.png';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { UserAccount } from '../types/account';

export const Profile: React.FC = () => {
  const account = useAccountInfo();
  const userName = "John Doe";
  const userEmail = account?.email || "my@organizer.com";
  const userRole =
    account && account instanceof UserAccount
      ? account.role
      : account
        ? "Company"
        : "Organizer";
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Main>
      <div className="flex h-screen overflow-hidden bg-[#EAF5FF]">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-[#273266] bg-white px-6 py-2 rounded-full shadow">
              Profile
            </h1>
            <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
              <p className="text-gray-500">{currentDate}</p>
            </div>
          </div>
          <div className="profile-banner"></div>

          <div className="bg-white rounded-b-3xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                <div>
                  <h1 className="text-2xl font-bold text-[#273266]">{userName}</h1>
                  <Badge label={userRole} className="bg-[#DDE6FB] text-sm px-3 py-1 mt-1" />
                </div>
              </div>
              <button className="bg-gray-200 hover:bg-gray-300 text-[#273266] font-semibold px-6 py-2 rounded-xl shadow-sm">
                Edit
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#273266] mb-2">About Me</h2>
              <div className="bg-[#DDEEFF] text-[#273266] p-4 rounded-xl text-sm leading-relaxed">
                Plan, manage, and optimize events with ease—powerful tools for seamless organization
                and interactive experiences.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-[#637381] mb-1">First Name</label>
                <input
                  type="text"
                  value={userName.split(' ')[0]}
                  readOnly
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#637381] mb-1">Last Name</label>
                <input
                  type="text"
                  value={userName.split(' ')[1] || ''}
                  readOnly
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#637381] mb-1">Email</label>
                <input
                  type="email"
                  value={userEmail}
                  readOnly
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#637381] mb-1">Role</label>
                <input
                  type="text"
                  value={userRole}
                  readOnly
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
