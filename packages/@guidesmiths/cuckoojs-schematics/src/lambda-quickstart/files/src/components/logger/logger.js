const pino = require('pino');

class Logger {
	constructor({config}) {
		const {serviceName} = config;
		this.pinoLogger = this.#initLogger({
			name: serviceName,
		});
	}

	#initLogger = ({name}) => pino({
		base: {
			name,
		},
		timestamp: pino.stdTimeFunctions.isoTime,
		formatters: {
			level: label => ({level: label}),
		},
	});

	debug = (message, data) => this.pinoLogger.debug({msg: message, data});

	info = (message, data) => this.pinoLogger.info({msg: message, data});

	warn = (message, data) => this.pinoLogger.warn({msg: message, data});

	error = (message, data) => this.pinoLogger.error({msg: message, data});
}

module.exports = Logger;
