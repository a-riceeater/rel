const modules = require("./modules")

function use(args, line, file) {
    const requirement = args.replaceAll("<", "").replaceAll(">", "");
    modules.adduse(requirement, line, file);
}

function checkForEnd(fname, d) {
    return d.includes(`}(${fname})`);
}

module.exports = { use, checkForEnd }