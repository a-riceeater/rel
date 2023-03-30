const used = [];
const ms = {}
const modules = ["<Logger>", "<Application>"];
const errors = require("./errors")

function adduse(mname, line, file) {
    if (!mname.startsWith("<") || !mname.endsWith(">")) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    if (!modules.includes(mname)) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    used.push(mname);
    ms[mname] = require("./rel_modules/" + mname.substring(1, mname.length - 1))
    return true;
}

module.exports = { adduse, ms }