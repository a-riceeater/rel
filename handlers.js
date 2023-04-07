const requires = require("./requires")
const fs = requires.fs;
const path = requires.path;

function wl(msg) {
    //const date = new Date();
    //fs.appendFile("./rel/rel-logs.txt", `\n[${date.getHours()}:${date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes()}] ` + msg, (err) => { if (err) throw err });
}

module.exports = { wl };