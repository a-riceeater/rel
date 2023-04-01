const used = [];
const ms = {}
const modules = ["<Logger>", "<Application>", "<EServer>", "<Timing>"];
const errors = require("./errors")

function adduse(mname, line, file) {
    if (!mname.startsWith("<") || !mname.endsWith(">")) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    if (!modules.includes(mname)) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    mname = mname.substring(1, mname.length - 1)
    used.push(mname);
    ms[mname] = require("./rel_modules/" + mname)
    return true;
}

module.exports = { adduse, ms }