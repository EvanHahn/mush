const home = require("home");

function cd(argv, callback) {
  const goTo = home.resolve(argv[0] || "~");
  let exitCode = 0;
  try {
    process.chdir(goTo);
    process.env.OLDPWD = process.env.PWD;
    process.env.PWD = goTo;
  } catch (err) {
    console.error("Can't CD into " + goTo);
    exitCode = 1;
  }
  callback(null, { exitCode });
}

module.exports = cd;
