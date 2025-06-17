export type LogLevel = 'debug' | 'info' | 'error' | 'warn';
export interface LoggerOptions {
    colorize?: boolean;
    transports?: Transport[];
}
export interface Transport {
    log(level: LogLevel, message: string): void;
}
