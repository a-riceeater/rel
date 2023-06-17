const variables = {};
const modules = require("./modules")
const errors = require("./errors")
const Reset = "\x1b[0m"
const FgRed = "\x1b[31m"

function isVariable(d) {
    if (isNumeric(d)) return false;
    else return !d.startsWith("\"") && !d.endsWith("\"")
}

async function putVariable(name, value, fname, fline) {
    if (isVariable(value)) {
        //if (variables[name]) return errors.throwVarExists(name, fname, fline);

        if ((!value.includes(".")) && value != "true" && value != "false") {
            variables[name] = value.substring(1, value.length - 1);
            return;
        }


        if (value == "false") value = false;
        if (value == "true") value = true;

        // if (value || !value) return variables[name] = value;

        const obj = value.substring(0, value.indexOf("."));
        const method = value.split(".")[1].replace(/\(.*/g, '');

        if (!modules.ms[obj]) {
            console.log(FgRed + "TypeError: Program exited with exit status 1:");
            console.log("   " + fname + ":" + fline)
            console.log("   Undefined:", obj, "is not defined");
            console.log("   At: ");
            console.log("   ", fname + ":" + fline, Reset);
            process.exit();
        }
        if (!modules.ms[obj][method]) {
            console.log(FgRed + "TypeError: Program exited with exit status 1:");
            console.log("   " + fname + ":" + fline)
            console.log("   Undefined: Could not find method " + method + " in object", obj);
            console.log("   At: ");
            console.log("   ", fname + ":" + fline, Reset);
            process.exit();
        };

        const response = await modules.ms[obj][method](value.split("(")[1].replace(")", ""))
        variables[name] = response.toString();
    } else {
        isNumeric(value) ? variables[name] = value : variables[name] = value.substring(1, value.length - 1);
    }
}

function getVariable(name, funcParams, fname) {
    //if (name.startsWith("Params.")) return funcParams[fname][name.split("Params.")[1]]
    if (variables[name] == null) errors.throwUndefined(name)
    return variables[name];
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}

module.exports = { variables, putVariable, getVariable };

/*
putVariable("a", `Logger.calculate("a")`, "main.rel", 1)

console.log(variables)*/