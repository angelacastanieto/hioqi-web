var config;
if (process.env.REACT_APP_NODE_ENV === 'production') {
  config = require('./production');
} else {
  config = require('./development');
}

module.exports = config;
