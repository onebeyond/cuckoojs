const validate = (input, schema) => {
  const ok = schema(input);
  const { errors } = schema;
  return {
    ok,
    errors,
  };
};
const schemaValidator = (input, schema) => {
  const { ok, errors } = validate(input, schema);
  if (!ok) {
    throw new Error(JSON.stringify(errors));
  }
  return input;
};

module.exports = schemaValidator;
