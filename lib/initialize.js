const read = require('read');

module.exports = function initialize() {

  const options = {
    prompt: '> '
  };

  read(options, (err, result) => {
    console.log(result);
  });

};
