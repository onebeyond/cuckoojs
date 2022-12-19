const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
	type: 'object',
	properties: {
		first_name: {type: 'string'},
		last_name: {type: 'string'},
	},
	required: ['first_name', 'last_name'],
	additionalProperties: false,
};

const compiledSchema = ajv.compile(schema);

const validate = data => {
	const ok = compiledSchema(data);
	const {errors} = compiledSchema;
	return {
		ok,
		errors,
	};
};

module.exports = {
	validate,
};
