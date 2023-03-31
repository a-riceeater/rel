const requires = require("./requires")
const fs = requires.fs;
const path = requires.path;
const manager = requires.manager;
const errors = require("./errors");
const handlers = require("./handlers");
const variables = require("./variables")


async function interp(file) {
    const fd = fs.readFileSync(file, "utf8")
    const flines = fd.split("\n")

    const mainFound = await checkForMain(file);
    mainFound ? handlers.wl("Main function found") : errors.throwMainNotFound(file.replace(/\.[^/.]+$/, ""), file);
    if (!mainFound) return;

    const mainEnds = await manager.checkForEnd(file.replace(/\.[^/.]+$/, ""), fd);
    if (!mainEnds) errors.throwUED(file.replace(/\.[^/.]+$/, ""), file)
    
    var readingFunction = false;
    var executingFunction = false;

    for (let i = 0; i < flines.length; i++) { 
        if (flines[i].trim().endsWith(";")) errors.throwSyntax(";", file)
        const line = flines[i].replaceAll("\r", "").trim();

        if (line == "") continue; 

        else if (line.includes("}(")) {
            if (readingFunction || executingFunction) {
                if (readingFunction == line.split("(")[1].replace(")", "")) {
                    readingFunction = false;
                }
            }
        }

        else if (readingFunction && !executingFunction) continue; 

        else if (line.startsWith("#") || line.startsWith("//")) continue; // comments

        else if (line.i("public " + file.replace(/\.[^/.]+$/, ""))) continue;
    
        else if (line.i("using ")) await manager.use(line.split(" ")[1], i, file);

        else if (line.startsWith("define ")) await variables.putVariable(line.split(" ")[1], line.split("=")[1].trim(), file, i);

        else if (line.i(".")) await manager.handleFunction(line, i, file); 

        else if (line.i("void ")) {
            var a = line.split("void ")[1];
            if (a.i("(")) a = a.replace(a.split("(")[1], "").replace("(", "");
            readingFunction = a

            const ended = await manager.checkForEnd(readingFunction, fd);

            if (!ended) errors.throwUED(readingFunction, file);
        }

        // else if (line.i("(") && line.i(")")) handle function call later
        

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