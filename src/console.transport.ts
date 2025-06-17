import { Transport, LogLevel } from './types.js';

export class ConsoleTransport implements Transport {
  log(level: LogLevel, message: string) {
    const levelMap: Record<LogLevel, (text: string) => any> = {
      error: console.error,
      warn: console.warn,
      debug: console.log,
      info: console.log,
    };
    return levelMap[level ?? 'info'](message) as string;
  }
}
