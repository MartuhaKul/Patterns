/**
 * Structural pattern: ADAPTER
 *
 * Allows objects with incompatible interfaces to work together.
 * The adapter "translates" calls of one interface into calls of another.
 *
 * Example: our application expects a single `PaymentProcessor` interface,
 * but two third-party payment systems (PayPal and Stripe) expose different APIs.
 */

// Target interface expected by our application.
export interface PaymentProcessor {
  pay(amountUah: number): string;
}

// Third-party library #1 — its API cannot be modified.
export class PayPalApi {
  public sendPayment(amountInUsd: number): string {
    return `PayPal: charged ${amountInUsd.toFixed(2)} USD`;
  }
}

// Third-party library #2 — different method, different currency unit.
export class StripeApi {
  public makeCharge(cents: number): string {
    return `Stripe: charged ${cents} cents (${(cents / 100).toFixed(2)} USD)`;
  }
}

// PayPal adapter: converts UAH to USD and calls sendPayment.
export class PayPalAdapter implements PaymentProcessor {
  private readonly UAH_TO_USD = 0.025;

  constructor(private paypal: PayPalApi) {}

  public pay(amountUah: number): string {
    const usd = amountUah * this.UAH_TO_USD;
    return this.paypal.sendPayment(usd);
  }
}

// Stripe adapter: converts UAH to cents and calls makeCharge.
export class StripeAdapter implements PaymentProcessor {
  private readonly UAH_TO_USD = 0.025;

  constructor(private stripe: StripeApi) {}

  public pay(amountUah: number): string {
    const cents = Math.round(amountUah * this.UAH_TO_USD * 100);
    return this.stripe.makeCharge(cents);
  }
}

// Demo: client code works with a SINGLE interface.
if (require.main === module) {
  const processors: PaymentProcessor[] = [
    new PayPalAdapter(new PayPalApi()),
    new StripeAdapter(new StripeApi()),
  ];

  for (const processor of processors) {
    console.log(processor.pay(1000));
  }
}
