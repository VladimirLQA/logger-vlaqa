import { LoggerOptions } from './types.js';
export default class Logger {
    private logArray;
    private static instance;
    private opts;
    private constructor();
    static getInstance(opts?: LoggerOptions): Logger;
    private static defaultOpts;
    private validateTransports;
    private applyColor;
    private buildHeader;
    private log;
    writeToFile(path: string): Promise<void>;
    clearLogs(): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
