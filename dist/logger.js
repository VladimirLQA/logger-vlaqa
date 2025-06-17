import { colors } from './colors.wrap.js';
import { ConsoleTransport } from './console.transport.js';
import { writeFile } from 'node:fs/promises';
export default class Logger {
    logArray = [];
    static instance;
    opts;
    constructor(opts) {
        this.opts = opts;
        this.validateTransports();
    }
    static getInstance(opts) {
        if (!Logger.instance) {
            const defaults = this.defaultOpts();
            const merged = { ...defaults, ...(opts ?? {}) };
            Logger.instance = new Logger(merged);
            return Logger.instance;
        }
        return Logger.instance;
    }
    static defaultOpts() {
        return {
            colorize: true,
            transports: [new ConsoleTransport()],
        };
    }
    validateTransports() {
        if (!Array.isArray(this.opts.transports) ||
            this.opts.transports.some((transport) => typeof transport.log !== 'function')) {
            throw new Error('Invalid transports configuration. Each transport must have a log method.');
        }
    }
    applyColor(level, text) {
        return this.opts.colorize ? colors[level](text) : text;
    }
    buildHeader(level) {
        return `[${new Date().toISOString()}] [${level.toUpperCase()}]:`;
    }
    log(level, messageParts) {
        const messageText = messageParts.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
        const header = this.buildHeader(level);
        const rawMessage = `${header} ${messageText}`;
        this.logArray.push(rawMessage);
        const styledHeader = this.applyColor(level, header);
        const styledMessage = `${styledHeader} ${messageText}`;
        this.opts.transports.forEach((transport) => transport.log(level, styledMessage));
    }
    async writeToFile(path) {
        try {
            await writeFile(path, this.logArray.join('\n'));
        }
        catch (error) {
            console.error(`Failed to write logs to file: ${error.message}`);
        }
    }
    clearLogs() {
        this.logArray = [];
    }
    debug(...args) {
        this.log('debug', args);
    }
    info(...args) {
        this.log('info', args);
    }
    warn(...args) {
        this.log('warn', args);
    }
    error(...args) {
        this.log('error', args);
    }
}
