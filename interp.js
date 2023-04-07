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
    var trueIffs = [];
    var funcParams = {};

    var pastMain = false;

    async function ia(start) {
        if (!start) start = 0;
        for (let i = start; i < flines.length; i++) {
            if (flines[i].trim().endsWith(";")) flines[i] = flines[i].trim().substring(0, flines[i].trim().length - 1)
            const line = flines[i].replaceAll("\r", "").trim();

            if (line == "") continue;

            else if (line.includes("}(")) {
                if (readingFunction || executingFunction) {
                    if (readingFunction == line.split("(")[1].replace(")", "") || executingFunction.toString().trim() == line.split("(")[1].replace(")", "").trim()) {
                        readingFunction = false;
                        if (executingFunction) ia(parseInt(i + 1))
                        if (executingFunction) return executingFunction = false;
                    }
                }
            }

            else if (readingFunction) continue;

            else if (line.startsWith("#") || line.startsWith("//")) continue; // comments

            else if (line.i("void ")) {
                if (executingFunction == line.split("void ")[1].replace(line.split("void ")[1].split("(")[1], "").replace("(", "")) continue;

                // if (executingFunction) continue;
                var a = line.split("void ")[1];
                if (a.i("(")) a = a.replace(a.split("(")[1], "").replace("(", "");
                readingFunction = a

                const ended = await manager.checkForEnd(readingFunction, fd);

                if (!ended) errors.throwUED(readingFunction, file);
            }

            /*else if (executingFunction) {
                if (!line.i("void ")) {
                    console.log(line, pastVoid)
                    if (!line.i(executingFunction) && !pastVoid) {
                        // console.log(line)
                        continue;
                    } else {
                        console.log("PASSED:", line)
                    }
                }
            }*/

            else if (line.i("public " + file.replace(/\.[^/.]+$/, ""))) {
                pastMain = true;
                continue;
            }

            else if (line.i("if (")) {
                var o1 = line.split("(")[1].replace(line.split(")")[1].replace("(", ""), "").replace(")", "").replace("{", "").trim()
                //console.log("IF OPTIONS:", o1, o1.length)

                const ofunc = line.split(")")[1].replace("(", "").trim()

                if (iffs.includes(i)) continue;

                if (o1 == "true") {
                    executingFunction = ofunc.trim();
                    iffs.push(i)
                    trueIffs.push(i)
                    if (executingFunction == "") errors.throwTypeError("()", i, file)

                    if (!checkVoid(ofunc.trim(), flines, i)) errors.throwIFNotFound(ofunc.trim())
                    return ia(i);
                }

                if (o1.length == 1) {
                    // handle truthy values
                    if (manager.isVariable(o1)) {
                        const value = variables.getVariable(o1);
                        if (value) {
                            if (executingFunction == ofunc.trim()) continue;
                            executingFunction = ofunc.trim();
                            iffs.push(i)
                            trueIffs.push(i)
                            if (executingFunction == "") errors.throwTypeError("()", i, file)
                            return ia(i);
                        }
                    } else {
                        if (o1) {
                            if (executingFunction != ofunc.trim()) {
                                executingFunction = ofunc.trim();
                                iffs.push(i)
                                trueIffs.push(i)
                                if (executingFunction == "") errors.throwTypeError("()", i, file)
                                return ia(i);
                            }
                        }
                    }
                } else {
                    var sideOne = o1.split(' ')[0]
                    const comparisonOperators = ['==', '!=', '<', '>', '<=', '>='];
                    const comparisonExpressionRegex = new RegExp(`(${comparisonOperators.join('|')})`);

                    const comparisonExpression = o1.split(comparisonExpressionRegex).map(expr => expr.trim());
                    const comparisonOperator = comparisonExpression.find(op => comparisonOperators.includes(op));
                    let comparisonValue = comparisonExpression[comparisonExpression.indexOf(comparisonOperator) + 1];


                    if (manager.isVariable(sideOne)) sideOne = variables.getVariable(sideOne)
                    if (manager.isVariable(comparisonValue)) comparisonValue = variables.getVariable(comparisonValue)

                    if (manager.isVariable(sideOne)) sideOne = `"${sideOne}"`
                    if (manager.isVariable(comparisonValue)) comparisonValue = `"${comparisonValue}"`

                    //o1 = `${variableValue} ${comparisonOperator} ${quoteChar}${comparisonValue}${quoteChar}`;

                    let comparisonResult;
                    if (comparisonOperator === '==') {
                        comparisonResult = sideOne == comparisonValue;
                    } else if (comparisonOperator === '!=') {
                        comparisonResult = sideOne != comparisonValue;
                    } else if (comparisonOperator === '<') {
                        comparisonResult = sideOne < comparisonValue;
                    } else if (comparisonOperator === '>') {
                        comparisonResult = sideOne > comparisonValue;
                    } else if (comparisonOperator === '<=') {
                        comparisonResult = sideOne <= comparisonValue;
                    } else if (comparisonOperator === '>=') {
                        comparisonResult = sideOne >= comparisonValue;
                    }

                    if (comparisonResult) {
                        executingFunction = ofunc.trim();
                        iffs.push(i)
                        trueIffs.push(i)
                        if (executingFunction == "") errors.throwTypeError("()", i, file)
                        return ia(i);
                    }
                }
                continue;
            }

            else if (line.i("else ")) {
                const res = await getLastIf(flines, i)
                const lastIf = res[0];
                const lastIfLine = res[1];

                if (!trueIffs.includes(lastIfLine)) {
                    const ofunc = line.split("else ")[1].replace(")", "").replace("(", "")
                    executingFunction = ofunc.trim();
                    if (executingFunction == "") errors.throwTypeError("()", i, file)
                    return ia(parseInt(i + 1));
                }
            }

            else if (line.i("using ")) {
                if (pastMain) errors.throwIllegalUsing(file, i)
                await manager.use(line.split(" ")[1], i, file);
            }

            else if (line.startsWith("define ")) {
                await variables.putVariable(line.split(" ")[1], line.split("=")[1].trim(), file, i);
            }

            else if (line.i(".")) await manager.handleFunction(line, i, file, funcParams, executingFunction);

            else if (line.i("(") && line.endsWith(")") && !line.i("}")) {
                if (executingFunction != line.substring(0, line.indexOf("(")).trim()) {
                    if (!checkVoid(line.substring(0, line.indexOf("(")).trim().trim(), flines, i)) errors.throwIFNotFound(line.substring(0, line.indexOf("(")).trim().trim())
                    executingFunction = line.substring(0, line.indexOf("(")).trim();
                    if (executingFunction == "") errors.throwTypeError("()", i, file)

                    const prs = (line.split("(")[1].replace(")", "")).split(",")
                    if (!funcParams[executingFunction]) funcParams[executingFunction] = {};

                    for (let i = 0; i < prs.length; i++) {
                        const pr = prs[i].trim();

                        let name = pr.substring(0, pr.indexOf("="));
                        let value = pr.split("=")[1];
                        
                        funcParams[executingFunction][name] = value;
                    }

                    return ia(i);
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

function checkVoid(vname, flines, i) {
    flines = flines.slice(i);
    for (let i = 0; i < flines.length; i++) {
        if (flines[i].trim().i("void " + vname)) return true;
        if (i == flines.length - 1) return false;
    }
}

function getLastIf(flines, ia) {
    for (let i = 0; i < ia; i++) {
        if (flines[i].i("if ")) return [flines[i].trim(), i];
    }
}

String.prototype.i = function (s) {
    return this.includes(s);
}

module.exports = { interp, ef }