export class ConsoleTransport {
    log(level, message) {
        const levelMap = {
            error: console.error,
            warn: console.warn,
            debug: console.log,
            info: console.log,
        };
        return levelMap[level ?? 'info'](message);
    }
}
