const schemaValidator = require('../utils/schemaValidator');
const httpResponse = require('../utils/httpResponse');

module.exports = (logger, schema) => (handler) => async (event, context) => {
  try {
    schemaValidator(event, schema);
  } catch (err) {
    logger.error('invalid input', { error: err.message });
    return httpResponse.error(err.message, 400);
  }
  return handler(event, context);
};
