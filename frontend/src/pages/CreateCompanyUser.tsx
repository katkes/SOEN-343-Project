import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import NavBar from '../components/NavBar';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Main } from '../layouts/Main';
import loginPNG from '../assets/signup.png';

export const CreateCompanyUser: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Main>
      <div className="min-h-screen bg-[#EAF5FF] flex items-center justify-center px-4 relative">
        <NavBar showTabs={false} />
        <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-6xl rounded-xl overflow-hidden shadow-lg p-16 bg-[#EAF5FF] form">
          <div className="w-full md:w-1/2 text-center px-6">
            <img src={loginPNG} alt="Create Visual" className="mx-auto w-80 h-80" />
            <h2 className="text-2xl font-bold mt-6 text-[#273266]">Add a Team Member</h2>
            <p className="mt-2 text-[#637381]">
              Create a Sponsor or Event Organizer account associated with your company.
            </p>
          </div>

          <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6 text-[#273266]">
              Create Company User
            </h2>
            <form onSubmit={() => {}} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
              >
                <option value="">Select Role</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Event Organizer">Event Organizer</option>
              </select>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && (
                  <XMarkIcon
                    className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={() => setEmail('')}
                  />
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password &&
                  (showPassword ? (
                    <EyeSlashIcon
                      className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeIcon
                      className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  ))}
              </div>

              <CustomButton type="submit" width="w-full">
                Create User
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};
