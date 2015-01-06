const objectAssign = require('object-assign');
const fs = require('fs');
const toml = require('toml');
const home = require('home');

const configFile = home.resolve('~/.mushconfig');

let userConfig = {};
if (fs.existsSync(configFile)) {
  const configContents = fs.readFileSync(configFile, { encoding: 'utf-8' });
  try {
    userConfig = toml.parse(configContents);
  } catch (err) {
    console.error('~/.mushconfig parse error');
    console.error('line ' + e.line + ', column ' + e.column);
    console.error(e.message);
  }
}

let config = objectAssign({
  prompt: '> '
}, userConfig);

module.exports = config;
