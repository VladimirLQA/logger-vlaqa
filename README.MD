# logger-vlaqa

`logger-vlaqa` is a simple and customizable logger implementation for Node.js. It supports multiple log levels, colorized output, and custom transports.

## Installation

Install the package via npm:

```bash
npm install logger-vlaqa
```

## Usage

### Basic Setup

Import the logger and start logging:

```ts
import Logger from 'logger-vlaqa';

const logger = Logger.getInstance();

logger.info('This is an info message');
logger.debug('This is a debug message');
logger.warn('This is a warning message');
logger.error('This is an error message');
```

### Custom Configuration

You can customize the logger by providing options:

```ts
import Logger from 'logger-vlaqa';
import { ConsoleTransport } from 'logger-vlaqa';

const customLogger = Logger.getInstance({
  colorize: false, // Disable colorized output
  transports: [new ConsoleTransport()], // Custom transports
});

customLogger.info('Custom logger setup complete');
```

### Writing Logs to a File

You can write logs to a file using the `writeToFile` method:

```ts
import Logger from 'logger-vlaqa';

const logger = Logger.getInstance();

logger.info('Logging to file example');
await logger.writeToFile('./logs.txt');
```

### Clearing Logs

Clear the in-memory log history:

```ts
logger.clearLogs();
```

## Features

- Supports log levels: `debug`, `info`, `warn`, `error`.
- Colorized output for better readability.
- Customizable log transports.
- Singleton pattern for consistent logging across your application.

## License

This project is licensed under the MIT License.
