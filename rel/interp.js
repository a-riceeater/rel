const requires = require("./requires")
const fs = requires.fs;
const path = requires.path;
const manager = requires.manager;
const errors = require("./errors");
const handlers = require("./handlers");
const variables = require("./variables");
const { exec } = require("child_process");


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
    const cr = /^(?!public).*hello\(\)[^{}]*$/;

    async function ia() {
        for (let i = 0; i < flines.length; i++) {
            if (flines[i].trim().endsWith(";")) errors.throwSyntax(";", file)
            const line = flines[i].replaceAll("\r", "").trim();

            if (line == "") continue;

            else if (line.includes("}(")) {
                if (readingFunction || executingFunction) {
                    if (readingFunction == line.split("(")[1].replace(")", "") || executingFunction.toString().trim() == line.split("(")[1].replace(")", "").trim()) {
                        readingFunction = false;
                        if (executingFunction) return executingFunction = false;
                    }
                }
            }

            else if (readingFunction) continue;

            else if (line.startsWith("#") || line.startsWith("//")) continue; // comments

            else if (line.i("public " + file.replace(/\.[^/.]+$/, ""))) continue;

            else if (line.i("using ")) await manager.use(line.split(" ")[1], i, file);

            else if (line.startsWith("define ")) await variables.putVariable(line.split(" ")[1], line.split("=")[1].trim(), file, i);

            else if (line.i(".")) await manager.handleFunction(line, i, file);

            else if (line.i("void ")) {
                if (executingFunction) continue;
                var a = line.split("void ")[1];
                if (a.i("(")) a = a.replace(a.split("(")[1], "").replace("(", "");
                readingFunction = a

                const ended = await manager.checkForEnd(readingFunction, fd);

                if (!ended) errors.throwUED(readingFunction, file);
            }
            
            else if (cr.test(line)) {
                executingFunction = line.substring(0, line.indexOf("("));
                ia();
            }

            else errors.throwTypeError(line, i, file)

            if (i == flines.length - 1) return true;

        }

    }

    ia();

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