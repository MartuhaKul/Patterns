/**
 * Behavioral pattern: OBSERVER
 *
 * Defines a one-to-many dependency: when the publisher (Subject) changes
 * state, all of its subscribers (Observers) are notified automatically.
 *
 * Example: a news channel. The channel publishes a story, and every
 * subscriber (email, SMS, push) receives a notification immediately.
 */

export interface Observer<T> {
  update(data: T): void;
}

export interface Subject<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(data: T): void;
}

// Publisher: keeps the list of subscribers and notifies them about events.
export class NewsChannel implements Subject<string> {
  private observers: Observer<string>[] = [];

  public subscribe(observer: Observer<string>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: Observer<string>): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notify(news: string): void {
    for (const observer of this.observers) {
      observer.update(news);
    }
  }

  public publish(news: string): void {
    console.log(`\n[Channel] New post: "${news}"`);
    this.notify(news);
  }
}

// Concrete subscribers with different reactions.
export class EmailSubscriber implements Observer<string> {
  constructor(private email: string) {}

  public update(news: string): void {
    console.log(`  -> Email to ${this.email}: ${news}`);
  }
}

export class SmsSubscriber implements Observer<string> {
  constructor(private phone: string) {}

  public update(news: string): void {
    console.log(`  -> SMS to ${this.phone}: ${news}`);
  }
}

// Demo.
if (require.main === module) {
  const channel = new NewsChannel();

  const alice = new EmailSubscriber('alice@example.com');
  const bob = new SmsSubscriber('+380501234567');

  channel.subscribe(alice);
  channel.subscribe(bob);

  channel.publish('A new web programming course has launched');

  channel.unsubscribe(bob);
  channel.publish('Bob will not receive this message anymore');
}
