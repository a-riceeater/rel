const used = [];
const ms = {}
const builtInModules = ["<Logger>", "<Application>", "<EServer>", "<Timing>", "<RFrame>"];
const errors = require("./errors")
const path = require("path")
const fs = require("fs")

function adduse(mname, line, file) {
    if (!mname.startsWith("<") || !mname.endsWith(">")) return errors.throwModuleNotFound(mname, line + ":" + "1", file);
    // if (!builtInModules.includes(mname)) return errors.throwModuleNotFound(mname, line + ":" + "1", file); - removed due to adding custom module feature !
    mname = mname.substring(1, mname.length - 1)
    used.push(mname);

    const location = path.join("C:\\Program Files\\rel", "./rel_modules/" + mname + (mname.endsWith(".js") ? "" : ".js"));
    if (!fs.existsSync(location)) return errors.throwModuleNotLocated(mname, line, file);

    ms[mname] = require(location)
    return true;
}

module.exports = { adduse, ms }