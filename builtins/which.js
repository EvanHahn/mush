const async = require('async');
const findProgramPath = require('../lib/find-program-path');

function which(paths, callback) {
  async.eachSeries(paths, (path, done) => {
    findProgramPath(path, (err, program) => {
      if (err) { return done(err); }
      if (!program.found) {
        console.error(path + ' not found');
      } else if (program.path) {
        console.log(program.path);
      } else if (program.isBuiltin) {
        console.log('built into mush');
      } else {
        throw new Error('Code should never reach this point');
      }
      callback(null, { exitCode: 0 });
    });
  }, callback);
}

module.exports = which;
