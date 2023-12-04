const System = require('systemic');
const initPino = require('./initPino');

module.exports = new System({ name: 'logging' })
  .add('logger', initPino())
  .dependsOn('config', 'pkg');
