import React, { useState } from 'react';
import { Main } from '../layouts/Main';
import { authService } from '../services/backend/auth';
import { useNavigate } from 'react-router';
import { FrontEndRoutes } from './routes';
import loginPNG from '../assets/login.png';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import CustomButton from '../components/CustomButton';
import NavBar from '../components/NavBar';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      navigate(FrontEndRoutes.Dashboard);
    }
    catch {
      setErrMsg('Invalid credentials');
    }
  };

  return (
    <Main>
      <div className="min-h-screen bg-[#EAF5FF] flex items-center justify-center px-4">
        <NavBar />
        <div className="flex flex-col-reverse md:flex-row items-center bg-[#EAF5FF] w-full max-w-6xl rounded-xl overflow-hidden shadow-lg p-16 form">
          <div className="w-full md:w-1/2 p-10 text-center">
            <img src={loginPNG} alt="Login Visual" className="mx-auto w-90 h-90" />
            <h2 className="text-2xl font-bold mt-6 text-[#273266]">Sign In to Start Learning!</h2>
            <p className="mt-2 text-[#637381]">
              If you don’t have an account you can{' '}
              <a href="/signup" className="text-blue-600 font-medium hover:underline">
                Register here!
              </a>
            </p>
          </div>

          <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6 text-[#273266]">Log In</h2>
            <form onSubmit={onSubmit} className="space-y-5">
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
                Log In
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};
