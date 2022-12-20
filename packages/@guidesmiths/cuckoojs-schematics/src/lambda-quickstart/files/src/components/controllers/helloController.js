const helloController = ({ logger }) => {
	const mergeName = (firstName, lastName) => {
		logger.info('merging name', {firstName, lastName});
		return `${firstName} ${lastName}`;
	};

	return {
		mergeName
	}
}

module.exports = helloController;
