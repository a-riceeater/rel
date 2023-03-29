const requires = require("./requires")
const fs = requires.fs;
const path = requires.path;
const manager = requires.manager;
const handlers = require("./handlers");

async function interp(file) {
    const fd = fs.readFileSync(file, "utf8")
    const flines = fd.split("\n")

    const mainFound = await checkForMain(file);
    mainFound ? handlers.wl("Main function found") : throwMainNotFound(file);
    if (!mainFound) return;
    

    for (let i = 0; i < flines.length; i++) {
        const line = flines[i].replaceAll("\r", "").trim();

    
        if (line.includes("using <")) manager.use(line.split(" ")[1], i, file);

    }

    return true;
}

function checkForMain(fname) {
    const fd = fs.readFileSync(fname, "utf8");
    return fd.includes("public " + fname.replace(/\.[^/.]+$/, ""));
}

module.exports = { interp }