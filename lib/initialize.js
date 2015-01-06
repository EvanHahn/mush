const read = require('read');
const runCommand = require('./run-command');

function readCommand(callback) {

  const options = {
    prompt: '> '
  };

  read(options, (err, command) => {

    if (err) {
      callback(err);
    } else if (command === 'exit') {
      callback(null, { shouldQuit: true });
    } else {
      runCommand(command, err => {
        callback(null, {});
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
