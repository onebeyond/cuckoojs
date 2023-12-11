const System = require('systemic');
const { join } = require('path');

module.exports = () =>
  new System({ name: '<%=directory%>' })
  .bootstrap(join(__dirname, 'src', 'components'));

