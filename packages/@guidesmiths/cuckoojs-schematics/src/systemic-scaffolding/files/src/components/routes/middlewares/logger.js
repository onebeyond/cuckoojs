module.exports = () => {
  const start = async ({ app, logger }) => {
    app.use((req, res, next) => {
      logger.httpLogger(req, res);
      next();
    });

    return Promise.resolve();
  };

  return { start };
};
