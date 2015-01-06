const spawn = require('child_process').spawn;
const builtins = require('./builtins');
const findProgramPath = builtins.which.findProgramPath;

module.exports = function runCommand(command, callback) {

  const trimmedCommand = command.trim();
  if (!trimmedCommand) {
    callback(null);
    return;
  }

  const commandArgs = trimmedCommand.split(/\s+/g);
  const argv = commandArgs.slice(1);

  findProgramPath(commandArgs[0], (err, program) => {

    if (err) {
      callback(err);
      return;
    }

    if (program.notFound) {
      console.error(commandArgs[0] + ' command not found');
      callback(null, { exitCode: 1 });

    } else if (program.isBuiltin) {
      program.fn.apply(this, argv.concat(callback));

    } else {
      const proc = spawn(program.path, argv);
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
      proc.on('close', exitCode => {
        callback(null, { exitCode });
      });

    }

  });

};
