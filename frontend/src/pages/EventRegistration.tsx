import Sidebar from '../components/Sidebar';
import CustomButton from '../components/CustomButton';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useEffect, useState } from 'react';
import { EventResponseDTO } from '../types/event';
import { eventService } from '../services/backend/event';

export const EventRegistration = () => {
  // const [paymentMethod, setPaymentMethod] = useState('Card');
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventResponseDTO>();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const validEventId = '645f3b2e8a8f3c0012345678'; // Dummy ID
    const validUserId = '645f3b2e8a8f3c0012345679'; // Dummy ID

    const paymentMethodId = 'pm_card_visa'; // Possibly replace with a different payment method, hardcode for now

    const payload = {
      eventId: validEventId, // TODO: Replace with real event ID
      userId: validUserId, // TODO: Replace with real user ID
      amount: 5000, // TODO: Replace with event ticket price in cents
      currency: 'cad', // Could use 'usd' as well
      paymentMethod: paymentMethodId, // Replace with Stripe PaymentMethod ID from Stripe Elements
    };

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Payment successful:', data);
        // Pass event info to EventConfirmation
        navigate(`/event/${event?._id}/confirmation`, { state: { event: event } });
      } else {
        console.error('Payment failed:', data.message);
        console.error('Payment error:', data.error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!id) {
          throw new Error('Event ID is undefined');
        }
        const responseJson = await eventService.getEventById(id);
        setEvent(responseJson); // Set the event details
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
  
    if (id) {
      fetchEvent();
    }
  }, [id]);

  return (
    <div className="flex bg-[#EAF5FF] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader pageName="Event Registration" />

        {/* Event Info Banner */}
        <div className="bg-[#3D50FF] text-white rounded-t-xl px-12 py-10 shadow">
          <div className="text-sm flex gap-6 font-medium">
            <p>📅 {event?.startDateAndTime
              ? new Date(event.startDateAndTime).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
              : ''} 
            </p>
            <p>📍 {event?.location} </p>
          </div>
          <h1 className="text-4xl font-bold py-2">{event?.name}</h1>
          <p className="text-[#C8D1FF]">{event?.description}</p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-b-xl px-10 pb-10 pt-5 shadow mx-auto -mt-6">
          Payment Tabs
          {/* <div className="flex gap-4">
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
          </div> */}

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

          <CustomButton
            onClick={handleCheckout}
            className="bg-[#3D50FF] w-full py-3 text-white rounded-xl font-bold mt-6"
          >
            Checkout
          </CustomButton>
        </div>
      </main>
    </div>
  );
};
