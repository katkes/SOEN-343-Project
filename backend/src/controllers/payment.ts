import { Request, Response } from 'express';
import { StripeFacade } from '../services/stripe/StripeFacade';
import { Ticket } from '../services/mongo/ticket';
import { Logger } from '../configs/logger';

/**
 * POST /api/payment
 * Expected request body:
 * {
 *   "eventId": "string",
 *   "userId": "string",
 *   "amount": number,         // in cents, e.g., 5000 for $50.00
 *   "currency": "usd" | "cad",
 *   "cardNumber": "string",
 *   "expMonth": number,
 *   "expYear": number,
 *   "cvc": "string"
 * }
 */
export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, userId, amount, currency, cardNumber, expMonth, expYear, cvc } = req.body;

    Logger.info('Received payment request:', {
      eventId,
      userId,
      amount,
      currency,
      cardNumber,
      expMonth,
      expYear,
      cvc,
    });

    // Validate request fields
    if (
      !eventId ||
      !userId ||
      !amount ||
      !currency ||
      !cardNumber ||
      !expMonth ||
      !expYear ||
      !cvc
    ) {
      Logger.warn('Missing required fields in payment request.');
      res.status(400).json({ success: false, message: 'Missing required fields.' });
      return;
    }

    // Instantiate your Stripe facade
    const stripeFacade = new StripeFacade();

    // Create a PaymentMethod from raw card details
    const paymentMethod = await stripeFacade.createPaymentMethod(
      cardNumber,
      expMonth,
      expYear,
      cvc,
    );

    // Create and confirm a PaymentIntent using the PaymentMethod ID
    const paymentIntent = await stripeFacade.createPaymentIntentWithMethod(
      amount,
      currency,
      paymentMethod.id,
    );

    // Handle Payment Intent status:
    if (
      paymentIntent.status === 'requires_action' ||
      paymentIntent.status === 'requires_confirmation'
    ) {
      Logger.info(
        `Payment requires additional authentication. Client secret: ${paymentIntent.client_secret}`,
      );
      res.status(200).json({
        success: false,
        clientSecret: paymentIntent.client_secret,
        message: 'Additional authentication required.',
      });
      return;
    }

    // If the payment succeeded, create a ticket
    if (paymentIntent.status === 'succeeded') {
      const newTicket = new Ticket({
        eventId,
        userId,
        paymentId: paymentIntent.id,
        // Add any other fields as needed (e.g., purchaseDate)
      });
      await newTicket.save();

      Logger.info(`Payment successful for user ${userId} and event ${eventId}. Ticket created.`);
      res.status(200).json({
        success: true,
        message: 'Payment successful, ticket created.',
        ticket: newTicket,
      });
      return;
    }

    // In case payment is not successful, return an appropriate message
    Logger.warn(`Payment not successful for user ${userId} and event ${eventId}.`);
    res.status(400).json({ success: false, message: 'Payment not successful. Please try again.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(`Payment error: ${error.message}`);
      res.status(500).json({ success: false, message: error.message });
    } else {
      Logger.error('Unexpected error occurred during payment.');
      res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
  }
};
