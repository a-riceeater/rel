const requires = require("./requires")
const fs = requires.fs;
const path = requires.path;
const manager = requires.manager;
const errors = require("./errors");
const handlers = require("./handlers");

async function interp(file) {
    const fd = fs.readFileSync(file, "utf8")
    const flines = fd.split("\n")

    const mainFound = await checkForMain(file);
    mainFound ? handlers.wl("Main function found") : errors.throwMainNotFound(file.replace(/\.[^/.]+$/, ""), file);
    if (!mainFound) return;

    const mainEnds = await manager.checkForEnd(file.replace(/\.[^/.]+$/, ""), fd);
    if (!mainEnds) errors.throwUED(file.replace(/\.[^/.]+$/, ""), file)
    

    for (let i = 0; i < flines.length; i++) {
        const line = flines[i].replaceAll("\r", "").trim();

        if (line == "") continue; 

        if (line.startsWith("#") || line.startsWith("//")) continue; // comments

        if (line.includes("public " + file.replace(/\.[^/.]+$/, ""))) continue;
    
        if (line.i("using ")) { manager.use(line.split(" ")[1], i, file); continue }

        if (line.i(".")) { manager.handleFunction(line, i, file); continue; }
        
        if (line.includes("}(") || line.includes("} (")) continue; // switch to handle function ends later

        else errors.throwTypeError(line, i, file)
    }

    return true;
}

function checkForMain(fname) {
    const fd = fs.readFileSync(fname, "utf8");
    return fd.includes("public " + fname.replace(/\.[^/.]+$/, ""));
}

String.prototype.i = function (s) {
    return this.includes(s);
}

module.exports = { interp }