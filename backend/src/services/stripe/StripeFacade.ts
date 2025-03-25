import Stripe from 'stripe';
import { Logger } from '../../configs/logger';

export class StripeFacade {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  /**
   * Verify the Stripe connection by making a simple call, e.g. retrieving the account or balance.
   * This is useful to confirm your API key is valid before the server fully starts.
   */
  public async verifyConnection(): Promise<void> {
    try {
      // For instance, retrieve the balance as a quick check:
      await this.stripe.balance.retrieve();
      Logger.info('Stripe connection verified successfully.');
    } catch (error) {
      Logger.error('Stripe connection error:', error);
      throw error;
    }
  }

  /**
   * TODO: To be implemented and enhanced in future.
   *
   * Sample method to create a charge using the Stripe API.
   * @param amount The amount to charge in cents.
   * @param currency The currency of the charge.
   * @param source The payment source, e.g. a token or card ID.
   * @returns The charge object returned by the Stripe API.
   *
   * @see https://stripe.com/docs/api/charges/create
   */
  public async createCharge(amount: number, currency: string, source: string) {
    try {
      const charge = await this.stripe.charges.create({
        amount,
        currency,
        source,
      });
      return charge;
    } catch (error) {
      Logger.error('Charge creation failed:', error);
      throw error;
    }
  }
}
