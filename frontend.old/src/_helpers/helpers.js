/* eslint-disable func-names */
const path = require('path');

// eslint-disable-next-line no-underscore-dangle
const _root = path.resolve(__dirname, '..');

exports.root = function (args) {
  args = Array.prototype.slice.call(arguments, 0);

  return path.join.apply(path, [ _root].concat(args));
};

exports.assetsPath = function (_path) {
  return path.posix.join('static', _path);
};
