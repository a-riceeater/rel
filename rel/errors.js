const fs = require("fs")
const path = require("path")

// eval(fs.readFileSync(path.join(__dirname, "./colors.js"), "utf-8"))

const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"
const FgGray = "\x1b[90m"

const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"
const BgGray = "\x1b[100m"

function throwTypeError(error, line, filename) {
    console.log(FgRed + "TypeError: Program exited with exit status 1:");
    console.log("   " + filename + ":" + line)
    console.log("   ", error, "is not defined");
    console.log("   At: ");
    console.log("   ", filename + ":" + line, Reset);
    process.exit();
}

function throwError(error, line) {

}

function throwMainNotFound(main, filename) {
    console.log(FgRed + "TypeErrror: Program exited with exit status 0:");
    console.log("   File", path.join(__dirname, "../" + filename), "did not contain public '" + main + "'", Reset);
    process.exit()
}

function throwModuleNotFound(mname, line, filename) {
    console.log(FgRed + "TypeError: Program exited with exit status 0:");
    console.log("   " + filename + ":" + line)
    console.log("   Module", mname, "is undefined.");
    console.log("   At: ");
    console.log("   ", path.join(__dirname, "../" + filename) + ":" + line, Reset);
    process.exit()
}

function throwUED(fname, file) {
    console.log(FgRed + "SyntaxError: Program exited with exit status 3:");
    console.log("   Unexpected end of input at function: " + fname);
    console.log("   At: ");
    console.log("   ", path.join(__dirname, "../" + file), Reset);
    process.exit()
}

function throwSyntax(char, file) {
    console.log(FgRed + "SyntaxError: Program exited with exit status 3:");
    console.log("   Unexpected character: " + char);
    console.log("   At: ");
    console.log("   ", path.join(__dirname, "../" + file), Reset);
    process.exit()
}

function throwVarExists(vname, file, line) {
    console.log(FgRed + "TypeError: Program exited with exit status 4:");
    console.log("   Variable already declared: Variable \"" + vname + "\" already exists.");
    console.log("   At: ");
    console.log("   ", path.join(__dirname, "../" + file) + ":" + line, Reset);
    process.exit()
}

function throwUndefined(vname) {
    console.log(FgRed + "TypeError: Program exited with exit status 4:");
    console.log("   Undefined: \"" + vname + "\"", Reset);
    process.exit()
}

function hasError() {
    return error;
}

module.exports = { throwTypeError, hasError, throwModuleNotFound, throwMainNotFound, throwUED, throwSyntax, throwVarExists, throwUndefined }