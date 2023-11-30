const supertest = require('supertest');
const system = require('../system');

describe('Service Tests', () => {
	let request;
	const sys = system();

	beforeAll(async () => {
		const { app } = await sys.start();
		request = supertest(app);
	});

	afterAll(() => sys.stop());


	it('returns manifest', () =>
		request
			.get('/__/manifest')
			.expect(200)
			.then(response => {
				expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
				expect(response.headers['x-frame-options']).toEqual('SAMEORIGIN');
				expect(response.headers['x-download-options']).toEqual('noopen');
				expect(response.headers['x-dns-prefetch-control']).toEqual('off');
				expect(response.headers['x-content-type-options']).toEqual('nosniff');
				expect(response.headers['strict-transport-security']).toEqual('max-age=15552000; includeSubDomains');
			}));

});
