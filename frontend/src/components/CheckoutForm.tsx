import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  eventId: string;
  userId: string;
  amount: number; // Amount in cents
  eventName: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ eventId, userId, amount, eventName }) => {

  const fetchClientSecret = useCallback(() => {
    return fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        userId,
        amount,
        currency: 'usd', 
        eventName,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [eventId, userId, amount]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;