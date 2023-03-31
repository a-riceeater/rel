const variables = {};
const manager = require("./managers")
const modules = require("./modules")
const errors = require("./errors")
const Reset = "\x1b[0m"
const FgRed = "\x1b[31m"

function isVariable(d) {
    return !d.startsWith("\"") && !d.endsWith("\"")
}

async function putVariable(name, value, fname, fline) {
    if (isVariable(value)) {
        if (variables[name]) return errors.throwVarExists(name, fname, fline);

        if (!value.includes(".")) {
            variables[name] = value.substring(1, value.length - 1);
            return;
        }

        const obj = value.substring(0, value.indexOf("."));
        const method = value.split(".")[1].replace(value.split("(")[1], "").replace("(", "");

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

        const response = modules.ms[obj][method](value.split("(")[1].replace(")", ""))
        variables[name] = response.toString();
    } else {
        if (variables[name]) return errors.throwVarExists(name, fname, fline)
        variables[name] = value.substring(1, value.length - 1);
    }
}

function getVariable(name) {
    return variables[name];
}

module.exports = { variables, putVariable, getVariable };

/*
putVariable("a", `Logger.calculate("a")`, "main.rel", 1)

console.log(variables)*/