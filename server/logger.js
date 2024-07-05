// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
//const winston = require('winston');
const winston = require('winston');
const path = require('path');
const { combine, timestamp, printf, colorize, align } = winston.format;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const customLogLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'gray',
    trace: 'white',
  },
};

winston.addColors(customLogLevels.colors);

const defaultLoggerStyles = {
  console: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  file: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
};

const logger = winston.createLogger({
  levels: customLogLevels.levels, // remove to use default logger levels
  level: process.env.LOG_LEVEL || 'info',
  //format: winston.format.cli(),
  //format: combine(timestamp(), json()),
  //format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: defaultLoggerStyles.console,
    }),
    new winston.transports.File({
      filename: process.env.LOG_DIR
        ? path.join(process.env.LOG_DIR, 'server.log')
        : 'logs/server.log',
      level: 'info',
      format: defaultLoggerStyles.file,
    }),
    new winston.transports.File({
      filename: process.env.LOG_DIR
        ? path.join(process.env.LOG_DIR, 'server-error.log')
        : 'logs/server-error.log',
      level: 'error',
      format: defaultLoggerStyles.file,
    }),
  ],
});

logger.debug(`Log level: ${logger.level}`);

module.exports = logger;
