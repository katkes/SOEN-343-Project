import { Main } from '../layouts/Main';
import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import profilePic from '../assets/avatar.png';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { useNavigate } from 'react-router-dom';
import { FrontEndRoutes } from './routes';
import { useEffect } from 'react';
import { CompanyAccount, UserAccount } from '../types/account';

export const Profile: React.FC = () => {

  const account = useAccountInfo();
  const navigate = useNavigate();
  console.log("account", account);

  useEffect(() => {
    if ( account === null ) {
      navigate(FrontEndRoutes.Login);
    }
  }, [account, navigate]);

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
            {/* <h1 className="text-4xl font-bold text-[#273266] bg-white px-6 py-2 rounded-full shadow">
              {userFirstName} {userLastName}
            </h1> */}
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
                  {account instanceof UserAccount ? (
                    <>
                      <Badge label={account.role} className="bg-[#DDE6FB] text-sm px-3 py-1 mt-1" />
                      <h1 className="text-2xl font-bold text-[#273266]">
                        {account.firstName} {account.lastName}
                      </h1>
                      <p className="text-sm font-medium text-[#273266]">
                        {account.email} · {account.role}
                      </p>
                    </>
                  ) : account instanceof CompanyAccount ? (
                    <>
                      <Badge label={"Company"} className="bg-[#DDE6FB] text-sm px-3 py-1 mt-1" />
                      <h1 className="text-2xl font-bold text-[#273266]">
                        {account.companyName}
                      </h1>
                      <p className="text-sm font-medium text-[#273266]">
                        {account.email}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <button onClick = {() => navigate('/users/edit')}
                className="bg-gray-200 hover:bg-gray-300 text-[#273266] font-semibold px-6 py-2 rounded-xl shadow-sm">
                Edit
              </button>
            </div>

            {account instanceof UserAccount && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">First Name</label>
                  <input
                    type="text"
                    value={account.firstName}
                    readOnly
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={account.lastName}
                    readOnly
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">Email</label>
                  <input
                    type="email"
                    value={account.email}
                    readOnly
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">Role</label>
                  <input
                    type="text"
                    value={account.role}
                    readOnly
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                  />
                </div>
              </div>
            )}

            {account instanceof CompanyAccount && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-[#637381] mb-1">Company name</label>
                    <input
                      type="text"
                      value={account.companyName}
                      readOnly
                      className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#637381] mb-1">Company email</label>
                    <input
                      type="text"
                      value={account.email}
                      readOnly
                      className="w-full p-3 rounded-xl bg-[#F4F6F8] text-[#273266] font-medium"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-[#273266] mb-2">My Event Organizers</h2>
                  {/* Render list or option to view event organizers */}
                  <div className="bg-[#DDEEFF] text-[#273266] p-4 rounded-xl text-sm">No organizers added yet.</div>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-[#273266] mb-2">My Sponsors</h2>
                  {/* Render list or option to view sponsors */}
                  <div className="bg-[#DDEEFF] text-[#273266] p-4 rounded-xl text-sm">No sponsors added yet.</div>
                </div>
              </>
            )}


          </div>
        </div>
      </div>
    </Main>
  );
};
