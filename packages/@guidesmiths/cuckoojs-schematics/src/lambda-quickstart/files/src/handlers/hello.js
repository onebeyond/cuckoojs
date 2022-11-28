const {initContainer} = require('../components/container');
const extractPayload = require('./utils/extractPayload');
const helloInputSchema = require('./schemas/helloInput');
const httpResponse = require('./utils/httpResponse');

const {
	cradle: {
		logger, sampleController,
	},
} = initContainer();

module.exports.handler = async event => {
	logger.info('function invoked', event);
	let input;
	try {
		input = extractPayload.fromHttpRequest(event);
		const {ok, errors} = helloInputSchema.validate(input);
		if (!ok) {
			throw new Error(JSON.stringify(errors));
		}
	} catch (err) {
		logger.error('invalid input', {err});
		return httpResponse.error(err.message, 400);
	}

	try {
		const output = sampleController.mergeName(input.first_name, input.last_name);
		return httpResponse.ok(output);
	} catch (err) {
		logger.error('could not complete function', {err});
		return httpResponse.error(err.message);
	}
};
