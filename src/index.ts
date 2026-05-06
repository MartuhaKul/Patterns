/**
 * Demo of all three design patterns.
 * Run: npm start
 */

import { Logger } from './singleton';
import {
  PayPalApi,
  PayPalAdapter,
  StripeApi,
  StripeAdapter,
  PaymentProcessor,
} from './adapter';
import { NewsChannel, EmailSubscriber, SmsSubscriber } from './observer';

console.log('========================================');
console.log('1. SINGLETON (creational)');
console.log('========================================');

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log('First message');
logger2.log('Second message');
console.log(`logger1 === logger2 ? ${logger1 === logger2}`);
console.log(`Total entries in logger: ${logger1.getLogs().length}`);

console.log('\n========================================');
console.log('2. ADAPTER (structural)');
console.log('========================================');

const processors: PaymentProcessor[] = [
  new PayPalAdapter(new PayPalApi()),
  new StripeAdapter(new StripeApi()),
];
for (const processor of processors) {
  console.log(processor.pay(1000));
}

console.log('\n========================================');
console.log('3. OBSERVER (behavioral)');
console.log('========================================');

const channel = new NewsChannel();
const alice = new EmailSubscriber('alice@example.com');
const bob = new SmsSubscriber('+380501234567');

channel.subscribe(alice);
channel.subscribe(bob);
channel.publish('A new web programming course has launched');

channel.unsubscribe(bob);
channel.publish('Bob will not see this message');
