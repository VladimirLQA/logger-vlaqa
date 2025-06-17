import { Transport, LogLevel } from './types.js';
export declare class ConsoleTransport implements Transport {
    log(level: LogLevel, message: string): string;
}
