const helloController = require('../helloController');
const loggerMock = require('./mocks/logger');

describe('helloController', () => {
	const logger = loggerMock();

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should merge name ok', () => {
		const testHelloController = helloController({logger});
		const actual = testHelloController.mergeName('a', 'b');
		expect(actual).toBe('a b');
	});
});
