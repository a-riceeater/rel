const modules = require("./modules")

function use(args, line, file) {
    const requirement = args.replaceAll("<", "").replaceAll(">", "");
    modules.adduse(requirement, line, file);
}

module.exports = { use }