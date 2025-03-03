import winston from 'winston';
import { ENV_VARS } from './env';

// Create a custom log format
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${level.toUpperCase()} ${timestamp} : ${message}`;
});

export const Logger = winston.createLogger({
  level: ENV_VARS.IS_PROD ? 'info' : 'debug',
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    // log to terminal only
    new winston.transports.Console(),
  ],
});

/**
 * Examples of logs
 * Logger.debug('This is a debug message');  // In development showns as DEBUG, not shown in production
 * Logger.info('This is an info message');  // Shows as INFO
 * Logger.warn('This is a warning');        // Shows as WARN
 * Logger.error('This is an error');        // Shows as ERROR
 */
