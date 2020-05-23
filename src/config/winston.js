import appRoot from 'app-root-path';
import winston from 'winston';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    name: 'console.info',
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.simple(),
    silent: process.env.NODE_ENV === 'test',
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});

// log to console if not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

export default logger;
