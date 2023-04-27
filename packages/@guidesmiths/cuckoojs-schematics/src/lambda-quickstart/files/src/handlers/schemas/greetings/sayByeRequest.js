const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
	type: 'object',
	properties: {
		body: {
			type: 'object',
			properties: {
				first_name: {
					type: 'string'
				},
				last_name: {
					type: 'string'
				},
			},
			required: ['first_name', 'last_name'],
			additionalProperties: false,
		}
	},
	required: ['body'],
};

module.exports = ajv.compile(schema);
