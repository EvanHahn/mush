module.exports = function runCommand(command, callback) {

  const commandArgs = command.trim().split(/\s+/g);

  let program = commandArgs[0];

  callback(null);

};
