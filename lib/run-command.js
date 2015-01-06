const home = require('home');
const fs = require('fs');
const config = require('./config');
const spawn = require('child_process').spawn;
const chalk = require('chalk');

function findProgramPath(program, callback) {
  let result = null;
  const paths = [''].concat(config.path);
  for (let path of paths) {
    const programPath = home.resolve(path, program);
    if (fs.existsSync(programPath)) {
      result = programPath;
      break;
    }
  };
  callback(null, result);
}

module.exports = function runCommand(command, callback) {

  const commandArgs = command.trim().split(/\s+/g);

  findProgramPath(commandArgs[0], (err, programPath) => {

    if (err) {
      callback(err);
      return;
    }

    if (!programPath) {
      console.error(commandArgs[0] + ' command not found');
      callback(null, { exitCode: 1 });
      return;
    }

    const proc = spawn(programPath, commandArgs.slice(1));

    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', exitCode => {
      callback(null, { exitCode });
    });

  });

};
