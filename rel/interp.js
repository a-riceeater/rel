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
    var iffs = [];

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

            // else if (executingFunction && (!line.includes("void ") && !line.i(executingFunction))) continue; // to prevent other code from executing until function is reached

            else if (readingFunction) continue;

            else if (line.startsWith("#") || line.startsWith("//")) continue; // comments

            else if (line.i("void ")) {
                if (executingFunction) continue;
                var a = line.split("void ")[1];
                if (a.i("(")) a = a.replace(a.split("(")[1], "").replace("(", "");
                readingFunction = a

                const ended = await manager.checkForEnd(readingFunction, fd);

                if (!ended) errors.throwUED(readingFunction, file);
            }

            else if (line.i("public " + file.replace(/\.[^/.]+$/, ""))) continue;

            else if (line.i("if (")) {
                const o1 = line.split("(")[1].replace(line.split(")")[1].replace("(", ""), "").replace(")", "").replace("{", "").trim()
                //console.log("IF OPTIONS:", o1, o1.length)

                const ofunc = line.split(")")[1].replace("(", "").trim()

                if (iffs.includes(i)) continue;

                if (o1 == "true") {
                    executingFunction = ofunc.trim();
                    iffs.push(i)
                    if (executingFunction == "") errors.throwTypeError("()", i, file)
                    ia();
                    return;
                }

                if (o1.length == 1) {
                    // handle truthy values
                    if (manager.isVariable(o1)) {
                        const value = variables.getVariable(o1);
                        if (value) {
                            if (executingFunction == ofunc.trim()) continue;
                            executingFunction = ofunc.trim();
                            iffs.push(i)
                            if (executingFunction == "") errors.throwTypeError("()", i, file)
                            ia();
                        }
                    } else {
                        if (o1) {
                            if (executingFunction != ofunc.trim()) {
                                executingFunction = ofunc.trim();
                                iffs.push(i)
                                if (executingFunction == "") errors.throwTypeError("()", i, file)
                                ia();
                            }
                        }
                    }
                } else {

                }
                continue;
            }

            else if (line.i("using ")) await manager.use(line.split(" ")[1], i, file);

            else if (line.startsWith("define ")) {
                await variables.putVariable(line.split(" ")[1], line.split("=")[1].trim(), file, i);
            }

            else if (line.i(".")) await manager.handleFunction(line, i, file);

            else if (line.i("(") && line.endsWith(")") && !line.i("}") && !line.i("if")) {
                if (executingFunction != line.substring(0, line.indexOf("(")).trim()) {
                    executingFunction = line.substring(0, line.indexOf("(")).trim();
                    if (executingFunction == "") errors.throwTypeError("()", i, file)
                    return ia();
                }
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

function ef(fname) {
    executingFunction = fname.trim();
    if (executingFunction == "") errors.throwTypeError("()", i, file)
    ia();
}

String.prototype.i = function (s) {
    return this.includes(s);
}

module.exports = { interp, ef }