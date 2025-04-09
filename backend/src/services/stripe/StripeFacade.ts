import Stripe from 'stripe';
import { Logger } from '../../configs/logger';

/***
 *
 * StripeFacade is a class that provides a simplified interface for interacting with the Stripe API.
 * The Facade pattern is used here to encapsulate the complexity of the Stripe API and provide a cleaner interface.
 *
 */
export class StripeFacade {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  /**
   * Verify the connection to the Stripe API.
   */
  public async verifyConnection(): Promise<void> {
    try {
      // For instance, retrieve the balance as a quick check:
      await this.stripe.balance.retrieve();
      Logger.info('Stripe connection verified successfully.');
    } catch (error: unknown) {
      Logger.error('Stripe connection error:', error);
      throw new Error('Failed to verify Stripe connection.');
    }
  }

  /**
   * Create a PaymentMethod from raw card details.
   */
  public async verifyPaymentMethod(
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string,
  ): Promise<Stripe.PaymentMethod> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: { number: cardNumber, exp_month: expMonth, exp_year: expYear, cvc },
      });
      return paymentMethod;
    } catch (error: unknown) {
      // Check if the error is a StripeError
      if (error instanceof Stripe.errors.StripeError) {
        throw new Error(`Payment Intent creation failed: ${error.message}`);
      }
      throw new Error('An unknown error occurred while creating the Payment Intent.');
    }
  }

  /**
   * Create and confirm a PaymentIntent with a given PaymentMethod ID.
   */
  public async createPaymentIntentWithMethod(
    amount: number,
    currency: string,
    paymentMethodId: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
        payment_method: paymentMethodId,
        confirmation_method: 'automatic',
        confirm: true,
      });
      return paymentIntent;
    } catch (error) {
      Logger.error('Failed to create PaymentIntent:', error);
      throw error;
    }
  }

  /**
   * Create a Stripe Checkout Session for embedded checkout.
   */
  public async createCheckoutSession(
    amount: number,
    currency: string,
    eventId: string,
    userId: string,
  ): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: `Event Ticket for Event ID: ${eventId}`,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          eventId,
          userId,
        },
      });

      Logger.info(`Checkout session created with ID: ${session.id}`);
      return session;
    } catch (error) {
      Logger.error('Failed to create Checkout Session:', error);
      throw error;
    }
  }

  /**
   * Retrieve the status of a Stripe Checkout Session.
   */
  public async getSessionStatus(sessionId: string): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      Logger.error('Failed to retrieve Checkout Session:', error);
      throw error;
    }
  }
}
