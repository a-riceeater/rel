const e = require("express");
const modules = require("./modules")
const FgRed = "\x1b[31m"
const Reset = "\x1b[0m"
const variables = require("./variables")

function use(args, line, file) {
    const requirement = args;
    modules.adduse(requirement, line, file);
}

function checkForEnd(fname, d) {
    return d.includes(`}(${fname})`);
}

const path = require("path")
async function handleFunction(line, fline, fname, funcParams, executingFunction) {
    const obj = line.substring(0, line.indexOf("."));
    const method = line.split(".")[1].replace(/\(.*/g, '');

    if (!modules.ms[obj]) {
        console.log(FgRed + "TypeError: Program exited with exit status 1:");
        console.log("   " + fname + ":" + fline)
        console.log("   Undefined:", obj, "is not defined");
        console.log("   At: ");
        console.log("   ", path.join(__dirname, "../" + fname) + ":" + fline, Reset);
        process.exit();
    }
    if (!modules.ms[obj][method]) {
        console.log(FgRed + "TypeError: Program exited with exit status 1:");
        console.log("   " + fname + ":" + fline)
        console.log("   Undefined: Could not find method " + method + " in object", obj);
        console.log("   At: ");
        console.log("   ", path.join(__dirname, "../" + fname) + ":" + fline, Reset);
        process.exit();
    };

    if (line.split("(")[1].replace(")", "").includes("+")) {
        const parts = (line.split("(")[1].replace(")", "")).split("+");
        let result = '';
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (!part.startsWith("\"") && !part.endsWith("\"")) {
                if (part.includes("Params.")) {
                    let param = funcParams[executingFunction][part.split("Params.")[1]];

                    if (!param) process.exit(); // throw error later

                    if (!isNumeric(param.replaceAll("\"", ""))) param = param.substring(1, param.length - 1);

                    result += param;
                    
                } else {
                    if (part.startsWith("Params.")) return result.push(part.split("Params.")[1])

                    var a = await variables.getVariable(part);
                    a.substring(1, a.length - 1)
                    result += a;
                }
            } else {
                result += part.substring(1, part.length - 1);
            }

            if (i == parts.length - 1) {
                modules.ms[obj][method](result);
            }
        }
    }
    else if (line.split("(")[1].replace(")", "").includes(",")) {
        const parts = (line.split("(")[1].replace(")", "")).split(",");
        let result = [];
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (!part.startsWith("\"") && !part.endsWith("\"")) {
                console.log(part)
                if (part.startsWith("Params.")) return result.push(part.split("Params.")[1])

                var a = await variables.getVariable(part, funcParams);
                a.substring(1, a.length - 1)
                result.push(a)
            } else {
                result.push(part.substring(1, part.length - 1));
            }

            if (i == parts.length - 1) {
                modules.ms[obj][method](...result);
            }
        }
    } else {
        let a = line.split("(")[1].replace(")", "");
        if (a.toString().trim() && isVariable(a)) {
            let b;

            if (a.startsWith("Params.")) b = funcParams[executingFunction][a.split("Params.")[1]]
            else b = variables.getVariable(line.split("(")[1].replace(")", ""));

            modules.ms[obj][method](isVariable(b) ? variables.getVariable(b) : b.slice(1, b.length - 1), funcParams, executingFunction)
        } else {
            if (isNumeric(line.split("(")[1].replace(")", ""))) modules.ms[obj][method](line.split("(")[1].replace(")", ""))
            else modules.ms[obj][method](line.split("(")[1].replace(")", "").substring(1, line.split("(")[1].replace(")", "").length - 1))
        }
    }

    return true;
}

function isVariable(d) {
    if (isNumeric(d)) return false;
    else return !d.startsWith("\"") && !d.endsWith("\"")
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}


function cpu(o, t, l, f) {
    console.log(FgRed + "TypeError: Program exited with exit status 1:");
    console.log("   " + o + ":" + l)
    console.log("   ", error, "is not defined");
    console.log("   At: ");
    console.log("   ", f + ":" + l, Reset);
    process.exit();
}

function handleVoid(line, l, file) {
    return 0;
}

// const interp = require("./interp")
function handleIF(line, file, l) {

    const o1 = line.split("(")[1].replace(line.split(")")[1].replace("(", ""), "").replace(")", "").replace("{", "").trim()
    console.log("IF OPTIONS:", o1, o1.length) 

    const ofunc = line.split(")")[1].replace("(", "").trim()
    console.log("ofunc:", ofunc)

    if (o1.length == 1) {
        // handle truthy values
        if (isVariable(o1)) {
            const value = variables.getVariable(o1);
            if (value) interp.ef(ofunc)
        } else {
            if (o1) interp.ef(ofunc)
        }
    } else {
        
    }

    return true;
}

module.exports = { use, checkForEnd, handleFunction, isVariable, handleVoid, handleIF }