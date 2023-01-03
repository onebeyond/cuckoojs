const greetingsController = ({ logger }) => {
	const sayHello = (firstName, lastName) => {
		logger.info('saying hello', {firstName, lastName});
		return `Hi, ${firstName} ${lastName}!`;
	};

	const sayBye = (firstName, lastName) => {
		logger.info('saying bye', {firstName, lastName});
		return `Bye, ${firstName} ${lastName}!`;
	};

	return {
		sayHello,
		sayBye,
	}
}

module.exports = greetingsController;
