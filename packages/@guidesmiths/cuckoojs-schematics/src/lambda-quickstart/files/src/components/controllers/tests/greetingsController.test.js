const greetingsController = require('../greetingsController');
const loggerMock = require('./mocks/logger');

describe('greetingsController', () => {
	const logger = loggerMock();

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should say hello', () => {
		const greetingsControllerInstance = greetingsController({logger});
		const actual = greetingsControllerInstance.sayHello('a', 'b');
		expect(actual).toBe('Hi, a b!');
	});

	test('should say bye', () => {
		const greetingsControllerInstance = greetingsController({logger});
		const actual = greetingsControllerInstance.sayBye('a', 'b');
		expect(actual).toBe('Bye, a b!');
	});
});
