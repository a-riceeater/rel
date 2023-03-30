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

function handleFunction(line, fline, fname) {
    const obj = line.substring(0, line.indexOf("."));
    const method = line.split(".")[1].replace(line.split("(")[1], "").replace("(", "");

    if (!modules.ms[obj]) {
        console.log(FgRed + "TypeError: Program exited with exit status 1:");
        console.log("   " + fname + ":" + fline)
        console.log("   Undefined:", obj, "is not defined");
        console.log("   At: ");
        console.log("   ", fname + ":" + fline, Reset);
        process.exit();
        return;
    }
    if (!modules.ms[obj][method]) {
        console.log(FgRed + "TypeError: Program exited with exit status 1:");
        console.log("   " + fname + ":" + fline)
        console.log("   Undefined: Could not find method " + method + " in object", obj);
        console.log("   At: ");
        console.log("   ", fname + ":" + fline, Reset);
        process.exit();
        return
    };

    if (isVariable(line.split("(")[1].replace(")", ""))) {
        modules.ms[obj][method](variables.getVariable(line.split("(")[1].replace(")", "")))
    } else {
        modules.ms[obj][method](line.split("(")[1].replace(")", ""))
    }

    return true;
}

function isVariable(d) {
    return !d.startsWith("\"") && !d.endsWith("\"")
}

function cpu(o, t, l, f) {
    console.log(FgRed + "TypeError: Program exited with exit status 1:");
    console.log("   " + o + ":" + l)
    console.log("   ", error, "is not defined");
    console.log("   At: ");
    console.log("   ", f + ":" + l, Reset);
    process.exit();
}

module.exports = { use, checkForEnd, handleFunction, isVariable }