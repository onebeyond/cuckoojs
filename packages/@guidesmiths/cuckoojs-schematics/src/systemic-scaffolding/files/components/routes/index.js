const System = require('systemic');
const adminRoutes = require('./admin-routes');
const initLoggerMiddleware = require('./middlewares/logger');
const initCoreMiddleware = require('./middlewares/core');

module.exports = new System({ name: 'routes' })
  .add('routes.admin', adminRoutes())
  .dependsOn('app', 'manifest')
  .add('routes.middleware.core', initCoreMiddleware())
  .dependsOn('config', 'app')
  .add('routes.middleware.logger', initLoggerMiddleware())
  .dependsOn('logger', 'app')
  .add('routes')
  .dependsOn(
    'routes.middleware.core',
    'routes.middleware.logger',
    'routes.admin',
  );
