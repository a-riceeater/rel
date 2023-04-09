const used = [];
const ms = {}
const modules = ["<Logger>", "<Application>", "<EServer>", "<Timing>", "<RFrame>"];
const errors = require("./errors")
const path = require("path")

function adduse(mname, line, file) {
    if (!mname.startsWith("<") || !mname.endsWith(">")) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    if (!modules.includes(mname)) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    mname = mname.substring(1, mname.length - 1)
    used.push(mname);
    ms[mname] = require(path.join("C:\\Program Files\\rel", "./rel_modules/" + mname))
    return true;
}

module.exports = { adduse, ms }