const fs = require("fs");
const path = require("path")

function wl(msg) {
    const date = new Date();
    fs.appendFile("./sqz/sqz-logs.txt", `\n[${date.getHours()}:${date.getMinutes()}] ` + msg, (err) => { if (err) throw err });
}

module.exports = { wl };