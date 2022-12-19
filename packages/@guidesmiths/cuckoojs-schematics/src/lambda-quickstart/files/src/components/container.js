const awilix = require('awilix');

let container;

const initContainer = () => {
	if (!container) {
		container = awilix.createContainer({
			injectionMode: awilix.InjectionMode.PROXY,
		});
		container.loadModules([
			`${__dirname}/*/*.js`,
			`!${__dirname}/*/*.test.js`,
		]);
		container.cradle.logger.info('container started!');
	}

	return container;
};

module.exports = {initContainer};
