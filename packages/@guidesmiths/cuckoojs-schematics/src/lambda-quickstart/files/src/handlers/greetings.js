const { compose } = require('@lambda-middleware/compose');
const {initContainer} = require('../components/container');
const { greetings: schemas } = require('./schemas');
const httpResponse = require('./utils/httpResponse');
const { processInput, validateInput } = require('./middlewares');


const {
	cradle: {
		logger, greetingsController,
	},
} = initContainer();

const sayHello = async (event) => {
	try {
		// eslint-disable-next-line camelcase
		const { first_name, last_name } = event.body;
		const output = await greetingsController.sayHello(first_name, last_name);
		return httpResponse.ok(output);
	} catch (err) {
		logger.error('could not complete function', { err });
		return httpResponse.error(err.message);
	}
}

const sayBye = async (event) => {
	try {
		// eslint-disable-next-line camelcase
		const {first_name, last_name} = event.body;
		const output = await greetingsController.sayBye(first_name, last_name);
		return httpResponse.ok(output);
	} catch (err) {
		logger.error('could not complete function', {err});
		return httpResponse.error(err.message);
	}
}

module.exports = {
	sayHello: compose(
		processInput(logger),
		validateInput(logger, schemas.sayHelloRequest),
	)(sayHello),
	sayBye: compose(
		processInput(logger),
		validateInput(logger, schemas.sayByeRequest),
	)(sayBye),
}


