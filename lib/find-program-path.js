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

  if ((!result.found) && builtins[program]) {
    result.fn = builtins[program];
    result.isBuiltin = true;
    result.found = true;
  }

  callback(null, result);

}

module.exports = findProgramPath;
