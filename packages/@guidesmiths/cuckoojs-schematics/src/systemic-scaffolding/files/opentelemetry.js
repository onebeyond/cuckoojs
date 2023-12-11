const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

const sdk = new opentelemetry.NodeSDK({
  instrumentations: [
    new PinoInstrumentation(),
    new ExpressInstrumentation(),
    new HttpInstrumentation(),
  ],
});

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(
      () => {},
      err => process.stderr.write('Error shutting down OpenTelemetry SDK', err),
    )
    .finally(() => process.exit(0));
});

module.exports = sdk;
