const pino = require('pino');

const logger = ({ config }) => {
		const { serviceName } = config;
		const pinoLogger = pino({
			base: {
				name: serviceName,
			},
			timestamp: pino.stdTimeFunctions.isoTime,
			formatters: {
				level: label => ({level: label}),
			},
		});

	const debug = (message, data) => pinoLogger.debug({msg: message, data});

	const info = (message, data) => pinoLogger.info({msg: message, data});

	const warn = (message, data) => pinoLogger.warn({msg: message, data});

	const error = (message, data) => pinoLogger.error({msg: message, data});

	return {
		debug,
		info,
		warn,
		error,
	}
}

module.exports = logger;
