const variables = {};
const manager = require("./managers")
const modules = require("./modules")
const Reset = "\x1b[0m"
const FgRed = "\x1b[31m"

function putVariable(name, value, fname, fline) {
    if (manager.isVariable(value)) {
        console.log(value)
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

        eval(modules.ms[obj][method](value.split("(")[1].replace(")", "")))
    } else {
        variables[name] = value;
    }
}

function getVariable(name) {

}

module.exports = { variables, putVariable, getVariable };

/*
putVariable("a", `Logger.calculate("a")`, "main.rel", 1)

console.log(variables)*/