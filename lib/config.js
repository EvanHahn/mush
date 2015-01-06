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
    console.error('line ' + err.line + ', column ' + err.column);
    console.error(err.message);
  }
}

let config = objectAssign({
  prompt: '> ',
  path: process.env.PATH.split(':'),
  aliases: []
}, userConfig);

module.exports = config;
