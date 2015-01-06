const async = require('async');

function sourceFile(file, callback) {
  callback(new Error('source not implemented'));
}

function source(argv, callback) {
  async.eachSeries(argv, sourceFile, callback);
}

module.exports = source;
