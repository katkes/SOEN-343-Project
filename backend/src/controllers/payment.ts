import { Request, Response } from 'express';
import { StripeFacade } from '../services/stripe/StripeFacade';
import { Logger } from '../configs/logger';
import { Ticket } from '../models/ticket'; // Import the Ticket model

/**
 * POST /api/payment
 * Expected request body:
 * {
 *   "eventId": "string",
 *   "userId": "string",
 *   "amount": number,         // in cents, e.g., 5000 for $50.00
 *   "currency": "usd" | "cad",
 *   "eventName": "string"     // Name of the event for the ticket
 * }
 */
export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, userId, amount, currency, eventName } = req.body;

    Logger.info('Received payment request:', { eventId, userId, amount, currency, eventName });

    // Validate request fields
    if (!eventId || !userId || !amount || !currency || !eventName) {
      Logger.warn('Missing required fields in payment request.');
      res.status(400).json({ success: false, message: 'Missing required fields.' });
      return;
    }

    // Instantiate Stripe facade and create Checkout Session
    const stripeFacade = new StripeFacade();
    const session = await stripeFacade.createCheckoutSession(
      amount,
      currency,
      eventId,
      userId,
      eventName,
    );

    if (session && session.client_secret) {
      Logger.info(`Checkout session created with ID: ${session.id}`);

      // Create a ticket in the database after successful session creation.
      // We link the ticket to the event and user, and store the payment session id.
      const ticket = new Ticket({
        eventId,
        userId,
        paymentId: session.id,
        isAttending: false, // Mark as not yet confirmed for attendance until payment is finished
        purchaseDate: new Date(),
      });

      await ticket.save();
      Logger.info(`Ticket created for event ${eventId} and user ${userId}.`);

      // Return the client secret so that the frontend can continue with Stripe Checkout.
      res.status(200).json({ success: true, clientSecret: session.client_secret });
      return;
    }

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
