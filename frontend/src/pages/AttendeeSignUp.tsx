import React, { useState } from 'react';
import { Main } from '../layouts/Main';
import loginPNG from '../assets/signup.png';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import CustomButton from '../components/CustomButton';
import NavBar from '../components/NavBar';

export const AttendeeSignUp: React.FC = () => {
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
            <img src={loginPNG} alt="SignUp Visual" className="mx-auto w-80 h-80" />
            <h2 className="text-2xl font-bold mt-6 text-[#273266]">Join as an Attendee</h2>
            <p className="mt-2 text-[#637381]">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-medium hover:underline">
                Login here!
              </a>
            </p>
          </div>

          <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6 text-[#273266]">
              Attendee Sign Up
            </h2>
            <form onSubmit={() => {}} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Choose a Role</option>
                <option value="Learner">Learner</option>
                <option value="Speaker">Speaker</option>
              </select>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

              <CustomButton type="submit" width="w-full" hoverColor="hover:bg-[#3b4edb]">
                Create Attendee Account
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};
