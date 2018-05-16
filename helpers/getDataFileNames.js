const path = require("path");
const glob = require("glob");

module.exports = () => glob.sync(path.join(process.cwd() + "/data/*.csv")).sort();