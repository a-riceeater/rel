const requires = require("./requires")
const fs = requires.fs;
const path = requires.path;

async function interp(file) {
    const fd = fs.readFileSync(file, "utf8")
    console.log(fd);
    return true;
}

module.exports = { interp }