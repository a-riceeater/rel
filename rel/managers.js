const modules = require("./modules")

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
    
    eval(modules.ms[obj][method](line.split("(")[1].replace(")", "")))

    return true;
}

function isVariable(d) {
    return !d.startsWith("\"") && !d.endsWith("\"")
}

module.exports = { use, checkForEnd, handleFunction, isVariable }