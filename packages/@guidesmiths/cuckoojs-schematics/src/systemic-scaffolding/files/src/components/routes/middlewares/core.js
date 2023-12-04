const helmet = require('helmet');
const validator = require('swagger-endpoint-validator');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = () => {
  const start = async ({ app, config }) => {
    const { swaggerValidator } = config;

    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    await validator.init(app, swaggerValidator);

    return Promise.resolve();
  };

  return { start };
};
