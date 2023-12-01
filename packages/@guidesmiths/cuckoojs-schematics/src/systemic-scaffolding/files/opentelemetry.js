const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const init = () => {
  const provider = new NodeTracerProvider();
  provider.register();

  registerInstrumentations({
    instrumentations: [
      new PinoInstrumentation(),
      new ExpressInstrumentation(),
      new HttpInstrumentation(),
    ],
  });
};

module.exports = { init };
