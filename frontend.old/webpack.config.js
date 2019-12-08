/* eslint-disable global-require */
const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
  module.exports = require('./src/_config/webpack.config.dev');
} else {
  module.exports = require('./src/_config/webpack.config.prod');
}
