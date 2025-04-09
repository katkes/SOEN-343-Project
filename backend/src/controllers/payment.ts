import { Request, Response } from 'express';
import { StripeFacade } from '../services/stripe/StripeFacade';
import { Logger } from '../configs/logger';

/**
 * POST /api/payment
 * Expected request body:
 * {
 *   "eventId": "string",
 *   "userId": "string",
 *   "amount": number,         // in cents, e.g., 5000 for $50.00
 *   "currency": "usd" | "cad",
 * }
 */
export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, userId, amount, currency } = req.body;

    Logger.info('Received payment request:', { eventId, userId, amount, currency });

    // Validate request fields
    if (!eventId || !userId || !amount || !currency) {
      Logger.warn('Missing required fields in payment request.');
      res.status(400).json({ success: false, message: 'Missing required fields.' });
      return;
    }

    // Instantiate Stripe facade and create Checkout Session
    const stripeFacade = new StripeFacade();
    const session = await stripeFacade.createCheckoutSession(amount, currency, eventId, userId);

    // Check if session was created successfully
    res.status(200).json({ success: true, clientSecret: session.client_secret });

    // // If the payment succeeded, create a ticket
    // if (paymentIntent.status === 'succeeded') {
    //   const newTicket = new Ticket({
    //     eventId,
    //     userId,
    //     paymentId: paymentIntent.id,
    //     // Add any other fields as needed (e.g., purchaseDate)
    //   });
    //   await newTicket.save();

    //   Logger.info(`Payment successful for user ${userId} and event ${eventId}. Ticket created.`);
    //   res.status(200).json({
    //     success: true,
    //     message: 'Payment successful, ticket created.',
    //     ticket: newTicket,
    //   });
    //   return;

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

export const getSessionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      res.status(400).json({ success: false, message: 'Session ID is required.' });
      return;
    }

    const stripeFacade = new StripeFacade();
    const session = await stripeFacade.getSessionStatus(session_id as string);

    res.status(200).json({
      success: true,
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(`Error retrieving session status: ${error.message}`);
      res.status(500).json({ success: false, message: error.message });
    } else {
      Logger.error('Unexpected error occurred while retrieving session status.');
      res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
  }
};
