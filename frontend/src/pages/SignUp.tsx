import React, { useState } from 'react';
import { Main } from '../layouts/Main';
import { authService } from '../services/backend/auth';
import { useNavigate } from 'react-router';
import { FrontEndRoutes } from './routes';
import loginPNG from '../assets/signup.png';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';
import NavBar from '../components/NavBar';

export const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isLoggedIn = await authService.login({ email, password });
    if (isLoggedIn) {
      navigate(FrontEndRoutes.Dashboard);
    } else {
      setErrMsg('Invalid credentials');
    }
  };

  return (
    <Main>
      <div className="min-h-screen bg-[#EAF5FF] flex items-center justify-center px-4 relative">
        <NavBar showTabs={false} />
        <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-6xl rounded-xl overflow-hidden shadow-lg p-16 bg-[#EAF5FF] signup-form">
          <div className="w-full md:w-1/2 text-center px-6">
            <img src={loginPNG} alt="SignUp Visual" className="mx-auto w-90 h-90" />
            <h2 className="text-2xl font-bold mt-6 text-[#273266]">
              Create an Account to try Eventful.io!
            </h2>
            <p className="mt-2 text-[#637381]">
              If you already have an account you can{' '}
              <a href="/login" className="text-blue-600 font-medium hover:underline">
                Login here!
              </a>
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6 text-[#273266]">
              Create an Account
            </h2>
            <form onSubmit={onSubmit} className="space-y-5">
              {/* First Name */}
              <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {firstName && (
                  <XMarkIcon
                    className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={() => setFirstName('')}
                  />
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {lastName && (
                  <XMarkIcon
                    className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={() => setLastName('')}
                  />
                )}
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Choose a Role</option>
                <option value="Event Organizer">Organizer</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Attendee">Speaker</option>
                <option value="Attendee">Attendee</option>
              </select>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

              {errMsg && <p className="text-red-600 text-sm">{errMsg}</p>}

              <CustomButton type="submit" width="w-full" hoverColor="hover:bg-[#3b4edb]">
                Sign Up
              </CustomButton>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="bg-white p-3 rounded-lg shadow hover:shadow-md clickable-button">
                <FcGoogle className="w-5 h-5" />
              </button>
              <button className="bg-white p-3 rounded-lg shadow hover:shadow-md clickable-button">
                <FaApple className="w-5 h-5 text-black" />
              </button>
              <button className="bg-white p-3 rounded-lg shadow hover:shadow-md clickable-button">
                <FaFacebookF className="w-5 h-5 text-[#3b5998]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
