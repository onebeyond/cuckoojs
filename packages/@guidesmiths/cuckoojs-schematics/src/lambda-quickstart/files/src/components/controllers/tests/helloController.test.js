const SampleController = require('../helloController');
const loggerMock = require('./mocks/logger');

describe('helloController', () => {
	const logger = loggerMock();

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should merge name ok', () => {
		const sampleController = new SampleController({logger});
		const actual = sampleController.mergeName('a', 'b');
		expect(actual).toBe('a b');
	});
});
