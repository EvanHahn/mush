const read = require('read');
const config = require('./config');
const runCommand = require('./run-command');

function readCommand(callback) {

  const options = {
    prompt: config.prompt
  };

  read(options, (err, command) => {

    if (err) {
      callback(err);
    } else if (command === 'exit') {
      callback(null, { shouldQuit: true });
    } else {
      runCommand(command, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result || {});
        }
      });
    }

  });
}

function initialize() {
  readCommand((err, result) => {
    if (err) { throw err; }
    if (result.shouldQuit) {
      process.exit(0);
    } else {
      initialize();
    }
  });
}

module.exports = initialize;
