import React, { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  eventId: string;
  userId: string;
  amount: number; // Amount in cents
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ eventId, userId, amount }) => {
  const [paymentStatus] = useState<string | null>(null);

  const fetchClientSecret = useCallback(() => {
    return fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        userId,
        amount,
        currency: 'usd', 
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [eventId, userId, amount]);

  // const checkPaymentStatus = async (sessionId: string) => {
  //   try {
  //     const response = await fetch(`/api/payment/session-status?session_id=${sessionId}`);
  //     const data = await response.json();
  //     setPaymentStatus(data.status);
  //   } catch (error) {
  //     console.error('Error checking payment status:', error);
  //   }
  // };

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
        // onComplete={(session) => {
        //   console.log('Checkout session completed:', session);
        //   checkPaymentStatus(session.id); // Check the payment status after completion
        // }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>

      {paymentStatus && (
        <div className="mt-4">
          {paymentStatus === 'complete' ? (
            <p className="text-green-500">Payment successful! Thank you for your purchase.</p>
          ) : (
            <p className="text-red-500">Payment not completed. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;