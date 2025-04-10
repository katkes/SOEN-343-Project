import { Request, Response } from 'express';
import { StripeFacade } from '../services/stripe/StripeFacade';
import { Logger } from '../configs/logger';
import { StatusCodes } from 'http-status-codes';
import { getAllSpeakers } from '../services/mongo/user';
import { getUserById } from '../services/mongo/user';
import { getEventById } from '../services/mongo/event';
import { Ticket } from '../models/ticket';
import { EmailService } from '../services/email/email';
import { generateEventInviteHtml } from '../services/email/email-templates/event-create-invite';

/**
 * POST /api/payment
 * Expected request body:
 * {
 *   "eventId": "string",
 *   "userId": "string",
 *   "amount": number,         // in cents, e.g., 5000 for $50.00
 *   "currency": "usd" | "cad",
 *   "eventName": "string",
 *   "email": "string",
 *   "location": "string",
 * }
 */

export async function getAllSpeakersController(req: Request, res: Response) {
  try {
    const speakers = await getAllSpeakers();
    res.status(StatusCodes.OK).json(speakers);
  } catch (error) {
    Logger.error('Error retrieving speakers: ', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error occurred while getting speakers.' });
  }
}

export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract new parameters from the request body.
    const { eventId, userId, amount, currency, eventName, email, location } = req.body;

    Logger.info('Received payment request:', {
      eventId,
      userId,
      amount,
      currency,
      eventName,
      email,
      location,
    });

    // Validate request fields
    if (!eventId || !userId || !amount || !currency || !eventName || !email || !location) {
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

      // Create a ticket in the database.
      const ticket = new Ticket({
        eventId,
        userId,
        paymentId: session.id,
        isAttending: false, // Not yet confirmed until payment is finished.
        purchaseDate: new Date(),
      });
      await ticket.save();
      Logger.info(`Ticket created for event ${eventId} and user ${userId}.`);

      // --- Start: Send confirmation email to user ---
      const recipientEmail = email;
      const emailHtml = generateEventInviteHtml(
        eventName,
        `Thank you for purchasing a ticket for ${eventName}. Your ticket has been confirmed.`,
        location,
        '',
      );

      const emailService = new EmailService();
      const emailResult = await emailService
        .createMailBuilder()
        .to(recipientEmail)
        .subject(`Ticket Confirmation for ${eventName}`)
        .html(emailHtml)
        .send();
      if (emailResult.success) {
        Logger.info(`Confirmation email sent to ${recipientEmail}`);
      } else {
        Logger.error(`Failed to send confirmation email: ${emailResult.error}`);
      }
      // --- End: Send confirmation email to user ---

      // Return the client secret so that the frontend can continue with Stripe Checkout.
      res.status(200).json({ success: true, clientSecret: session.client_secret });
      return;
    }



    // TODO: Create a ticket in the database after the purchase
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
