const async = require('async');
const builtins = require('../lib/builtins');
const config = require('../lib/config');
const executable = require('executable');
const fs = require('fs');
const home = require('home');

function findProgramPath(program, callback) {

  let result = {
    found: false
  };

  const paths = [''].concat(config.path);
  for (let path of paths) {
    const programPath = home.resolve(path, program);
    const fileExists = fs.existsSync(programPath);
    if (fileExists && executable.sync(programPath)) {
      result.path = programPath;
      result.found = true;
      break;
    }
  }

  if (!result.found && builtins[program]) {
    result.fn = builtins[program];
    result.isBuiltin = true;
  }

  callback(null, result);

}

function which(paths, callback) {
  async.eachSeries(paths, (path, done) => {
    findProgramPath(path, (err, program) => {
      if (err) { return done(err); }
      if (program.path) {
        console.log(program.path);
      } else if (program.isBuiltin) {
        console.log('built into mush');
      } else if (!program.found) {
        console.error(path + ' not found');
      }
      callback(null, { exitCode: 1 });
    });
  }, callback);
}

which.findProgramPath = findProgramPath;

module.exports = which;
