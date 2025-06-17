import { colors } from './colors.wrap.js';
import { ConsoleTransport } from './console.transport.js';
import { LoggerOptions, LogLevel } from './types.js';
import { writeFile } from 'node:fs/promises';

export default class Logger {
  private logArray: string[] = [];
  private static instance: Logger;
  private opts: LoggerOptions;
  private constructor(opts: LoggerOptions) {
    this.opts = opts;
    this.validateTransports();
  }

  static getInstance(opts?: LoggerOptions) {
    if (!Logger.instance) {
      const defaults = this.defaultOpts();
      const merged: LoggerOptions = { ...defaults, ...(opts ?? {}) };
      Logger.instance = new Logger(merged);
      return Logger.instance;
    }
    return Logger.instance;
  }

  private static defaultOpts() {
    return {
      colorize: true,
      transports: [new ConsoleTransport()],
    } as LoggerOptions;
  }

  private validateTransports() {
    if (
      !Array.isArray(this.opts.transports) ||
      this.opts.transports.some((transport) => typeof transport.log !== 'function')
    ) {
      throw new Error('Invalid transports configuration. Each transport must have a log method.');
    }
  }

  private applyColor(level: LogLevel, text: string): string {
    return this.opts.colorize ? colors[level](text) : text;
  }

  private buildHeader(level: LogLevel): string {
    return `[${new Date().toISOString()}] [${level.toUpperCase()}]:`;
  }

  private log(level: LogLevel, messageParts: any[]) {
    const messageText = messageParts.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');

    const header = this.buildHeader(level);
    const rawMessage = `${header} ${messageText}`;

    this.logArray.push(rawMessage);

    const styledHeader = this.applyColor(level, header);
    const styledMessage = `${styledHeader} ${messageText}`;

    this.opts.transports!.forEach((transport) => transport.log(level, styledMessage));
  }

  async writeToFile(path: string) {
    try {
      await writeFile(path, this.logArray.join('\n'));
    } catch (error) {
      console.error(`Failed to write logs to file: ${(error as Error).message}`);
    }
  }

  clearLogs() {
    this.logArray = [];
  }

  debug(...args: any[]) {
    this.log('debug', args);
  }
  info(...args: any[]) {
    this.log('info', args);
  }
  warn(...args: any[]) {
    this.log('warn', args);
  }
  error(...args: any[]) {
    this.log('error', args);
  }
}
