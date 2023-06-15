const yargs = require('yargs');
const prompt = require("prompt-sync")({ sigint: false });
const path = require('path');
const cwd = process.cwd();
const fs = require("fs")
const pkgFetch = require('pkg-fetch');

(async () => {
    // Create command-line arguments
    const argv = yargs
        .argv;

    const args = argv._;

    if (!args[0] || args[1].toString().toLowerCase() == "help") return console.log(`
rpm <command>\n
Usage:\n
rpm install/i           installs/updates all the modules in your projects
rpm install/i <foo>     install a rel module
rpm help                display this command
`)

    // Install command
    if (args[0] == "install" || args[0] == "i") {
    }
})();