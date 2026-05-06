/**
 * Creational pattern: SINGLETON
 *
 * Ensures a class has only one instance and provides a global access point
 * to it. Classic use cases: logger, configuration, database connection.
 */

export class Logger {
  private static instance: Logger | null = null;
  private logs: string[] = [];

  // Private constructor — cannot be instantiated from outside via `new`.
  private constructor() {}

  // The only way to obtain an instance.
  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}

// Demo: both variables point to the SAME object.
if (require.main === module) {
  const a = Logger.getInstance();
  const b = Logger.getInstance();

  a.log('User signed in');
  b.log('User opened profile page');

  console.log('a === b ?', a === b); // true
  console.log('Total entries:', a.getLogs().length); // 2
}
