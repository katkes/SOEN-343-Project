import React, { useState, useEffect } from 'react';
import { Main } from '../layouts/Main';
import Sidebar from '../components/Sidebar';
import { useAccountInfo } from '../hooks/useAccountInfo';
import { useNavigate } from 'react-router-dom';
import { FrontEndRoutes } from './routes';
import { CompanyAccount, UserAccount } from '../types/account';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const account = useAccountInfo();

  // For UserAccounts: we use firstName and lastName,
  // For CompanyAccounts: we use companyName.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Populate local state when account data is available
  useEffect(() => {
    if (account !== null) {
      if (account instanceof UserAccount) {
        setFirstName(account.firstName);
        setLastName(account.lastName);
      } else if (account instanceof CompanyAccount) {
        setCompanyName(account.companyName);
      }
      setLoading(false);
    } else {
      // If not logged in, redirect to Login
      navigate(FrontEndRoutes.Login);
    }
  }, [account, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Build payload based on account type
      const payload =
        account instanceof UserAccount
          ? { firstName, lastName }
          : { companyName };

      const response = await fetch('/api/users/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }
      console.log('Profile updated successfully.');
      
      navigate(FrontEndRoutes.Profile);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`Error updating profile: ${err.message}`);
        setError(err.message);
      } else {
        console.log('An unknown error occurred.');
        setError('An unknown error occurred.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Main>
      <div className="flex h-screen overflow-hidden bg-[#EAF5F8]">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-4xl font-bold text-[#273266] mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            {account instanceof UserAccount ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300"
                  />
                </div>
              </>
            ) : (
              account instanceof CompanyAccount && (
                <div>
                  <label className="block text-sm font-medium text-[#637381] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300"
                  />
                </div>
              )
            )}
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="bg-[#3D50FF] w-full py-3 text-white rounded-xl font-bold"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
};