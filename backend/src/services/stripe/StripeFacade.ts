import Stripe from 'stripe';
import { Logger } from '../../configs/logger';

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
   * Create a Payment Intent using the provided amount, currency, and PaymentMethod.
   *
   * Documentation for creating a Payment Intent: https://docs.stripe.com/api/payment_intents/create
   */
  public async createPaymentIntent(
    amount: number,
    currency: string,
    paymentMethod: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethod,
        payment_method_types: ['card'],
        confirm: true,
      });
      return paymentIntent;
    } catch (error: unknown) {
      // Check if the error is a StripeError
      if (error instanceof Stripe.errors.StripeError) {
        throw new Error(`Payment Intent creation failed: ${error.message}`);
      }
      throw new Error('An unknown error occurred while creating the Payment Intent.');
    }
  }
}
