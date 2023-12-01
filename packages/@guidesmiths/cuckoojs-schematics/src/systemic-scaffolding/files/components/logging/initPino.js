const pino = require('pino');
const pinoHttp = require('pino-http');

module.exports = () => {
  const start = async ({ config, pkg }) => {
    const { prettyLogs, level, hiddenAttributes = [] } = config;

    let loggerConfig = {
      level,
      base: {
        name: pkg.name,
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: (label) => ({ level: label }),
      },
      redact: {
        paths: hiddenAttributes,
        censor: '(hidden)',
      },
    };

    if (prettyLogs) {
      loggerConfig = {
        ...loggerConfig,
        transport: {
          target: 'pino-pretty',
        },
      };
    }

    const logger = pino(loggerConfig);
    const httpLogger = pinoHttp({ logger });

    const debug = (msg, data) => logger.debug({ msg, data });
    const info = (msg, data) => logger.info({ msg, data });
    const warn = (msg, data) => logger.warn({ msg, data });
    const error = (msg, data) => logger.error({ msg, data });
    const fatal = (msg, data) => logger.fatal({ msg, data });

    return {
      httpLogger,
      debug,
      info,
      warn,
      error,
      fatal,
    };
  };

  return {
    start,
  };
};
