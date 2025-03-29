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
}
