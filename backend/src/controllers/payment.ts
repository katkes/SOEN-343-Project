import { Request, Response } from 'express';
import { StripeFacade } from '../services/stripe/StripeFacade';
import { Ticket } from '../services/mongo/ticket';
import { Logger } from '../configs/logger';
import { getUserById } from '../services/mongo/user';
import { getEventById } from '../services/mongo/event';
import { EmailService } from '../services/email/email';
import { generateEventInviteHtml } from '../services/email/email-templates/event-create-invite';

/**
 * POST /api/payment
 * Expected request body:
 * {
 *   "eventId": "string",
 *   "userId": "string",
 *   "amount": number,         // in cents, e.g., 5000 for $50.00
 *   "currency": "usd",
 *   "paymentMethod": "string" // e.g., 'pm_card_visa' from Stripe Elements or a test token
 * }
 */
export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, userId, amount, currency, paymentMethod } = req.body;

    // Validate request fields
    if (!eventId || !userId || !amount || !currency || !paymentMethod) {
      Logger.warn('Missing required fields in payment request.');
      res.status(400).json({ success: false, message: 'Missing required fields.' });
      return;
    }

    // Instantiate your Stripe facade
    const stripeFacade = new StripeFacade();

    // Create a Payment Intent using the facade
    const paymentIntent = await stripeFacade.createPaymentIntent(amount, currency, paymentMethod);

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
      const user = await getUserById(userId);
      const event = await getEventById(eventId);
      const userEmail = user!.email;
      const result = await new EmailService()
        .createMailBuilder()
        .subject('Ticket Confirmation')
        .to(userEmail)
        .html(
          generateEventInviteHtml(
            event!.name,
            event!.description,
            event!.startDateAndTime,
            event!.timeDurationInMinutes,
            event!.location,
          ),
        )
        .send();
      console.log(
        result.success ? 'Email sent successfully!' : 'Failed to send email:',
        result.error,
      );

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
