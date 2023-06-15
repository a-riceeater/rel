// Rel Main Command

const yargs = require('yargs');
const prompt = require("prompt-sync")({ sigint: false });
const path = require('path');
const cwd = process.cwd();
const fs = require("fs")
const pkgFetch = require('pkg-fetch');

(async () => {
    // Create command-line arguments
    const argv = yargs
        .command('rel', 'Run a rel application', {
            name: {
                describe: 'Run a rel application',
                demandOption: true,
                type: 'string'
            }
        })
        .argv;


    if (!argv._[0]) {
        console.log("Welcome to rel v1.0.0")
        console.log("Type \".exit\" to quit.")
        function ask() {
            const a = prompt(">> ");
            try {
                if (a == ".exit") process.exit();
                eval(a);
            } catch (err) {
                console.error(err.toString().split("\n")[0]);
            } finally {
                ask();
            }
        }
        ask()

    } else {
        if (argv._[0] != "run") return console.error("Unknown command arguments:", argv._[0])

        const interper = require('./interp');
        const handlers = require("./handlers");
        const requires = require("./requires");

        if (!fs.existsSync(path.join(cwd, "./rel.json"))) {
            console.log(requires.FgRed + "ERROR: Program exited with exit status 0:");
            console.log("   " + path.join(cwd, "./rel.json"))
            console.log("ENODENT: no such file or directory", requires.Reset);
            process.exit()
        }
        const rel = JSON.parse(fs.readFileSync(path.join(cwd, "rel.json"), (err) => {
            console.log(requires.FgRed + "ERROR: Program exited with exit status 0:");
            console.log("   " + path.join(cwd, "./rel.json"))
            console.log("ENODENT: no such file or directory", requires.Reset);
            process.exit()
        }))

        if (rel.showJson == true) console.log(rel)

        handlers.wl("-- New Instance Started -- ")

        const file = rel.main;
        if (fs.existsSync(file)) {
            interper.interp(file)
                .then(() => {
                    handlers.wl("-- Instance Finished -- ")
                    if (rel.showExit) console.log("Program exited with status code 0.")
                })
        }
        else {
            console.log(requires.FgRed + "ERROR: Program exited with exit status 0:");
            console.log("   " + path.join(cwd, "../" + rel.main))
            console.log("ENODENT: no such file or directory", requires.Reset);
        }

        return;
    }
})();