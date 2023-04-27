const processBody = (event) => {
  if (!event.body) return null;
  try {
    const jsonBody = JSON.parse(event.body);
    return jsonBody;
  } catch (err) {
    return event.body;
  }
};

module.exports = (logger) => (handler) => async (event, context) => {
  logger.info('function invoked', { event });
  const mutatedEvent = {
    ...event,
    body: processBody(event),
  };
  return handler(mutatedEvent, context);
};
