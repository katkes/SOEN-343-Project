import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';

export const EventRegistration = () => {
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CustomButton
              onClick={() => navigate(-1)}
              disableDefaults
              className="bg-white px-2 py-1 rounded-full text-[#273266] font-bold shadow"
            >
              ◀
            </CustomButton>
            <h1 className="text-4xl font-bold text-[#273266] bg-white px-4 py-2 rounded-full shadow">
              Events
            </h1>
          </div>
          <div className="bg-[#273266] text-white py-2 px-4 rounded-xl font-medium text-sm">
            {currentDate}
          </div>
        </div>

        {/* Event Info Banner */}
        <div className="bg-[#3D50FF] text-white rounded-t-xl px-12 py-10 shadow">
          <div className="text-sm flex gap-6 font-medium">
            <p>📅 April 4th 2025</p>
            <p>📍 SGW Concordia</p>
          </div>
          <h1 className="text-4xl font-bold py-2">AI Conference 2025</h1>
          <p className="text-[#C8D1FF]">Join us for a conference on Artificial Intelligence.</p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-b-xl px-10 pb-10 pt-5 shadow mx-auto -mt-6">
          {/* Payment Tabs */}
          <div className="flex gap-4">
            {['Card', 'EPS', 'Giropay'].map((method) => (
              <CustomButton
                key={method}
                onClick={() => setPaymentMethod(method)}
                disableDefaults
                className={`px-6 py-3 rounded-lg text-sm font-medium border ${
                  paymentMethod === method
                    ? 'border-[#3D50FF] text-[#3D50FF] bg-[#F0F4FF]'
                    : 'border-gray-200 text-gray-500 bg-white'
                }`}
              >
                {method}
              </CustomButton>
            ))}
          </div>

          {/* Card Details */}
          <div className="space-y-4 pt-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Card number</label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm text-[#273266]"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Expiry</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">CVC</label>
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Country</label>
                <select className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Germany</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Postal code</label>
                <input
                  type="text"
                  placeholder="90210"
                  className="w-full p-3 rounded-xl bg-[#F4F6F8] border border-gray-300 text-sm"
                />
              </div>
            </div>
          </div>

          <CustomButton className="bg-[#3D50FF] w-full py-3 text-white rounded-xl font-bold mt-6">
            Checkout
          </CustomButton>
        </div>
      </main>
    </div>
  );
};
