process.env.SERVICE_ENV = process.env.SERVICE_ENV || 'local';

const runner = require('systemic-domain-runner');
const system = require('./system');
const openTelemetry = require('./opentelemetry');

openTelemetry.start();

const emergencyLogger = console;

const die = (message, err) => {
	emergencyLogger.error(err, message);
	process.exit(1);
};

runner(system(), { logger: emergencyLogger }).start((err, components) => {
	if (err) die('Error starting system', err);
	const { logger, pkg } = components;
	logger.info(`${pkg.name} has started`);
});
