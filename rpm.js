const yargs = require('yargs');
const path = require('path');
const fs = require("fs")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const version = "1.0.0"

/*
import yargs from 'yargs'
import path from 'path'
import XMLHttpRequest  from 'xmlhttprequest';
import fetch from 'node-fetch'*/

const updateLog = (message) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(message);
}

console.update = updateLog;

(async () => {
    const argv = yargs
        .argv;

    const args = argv._;

    if (!args[0] || args[1] && args[1].toString().toLowerCase() == "help") return console.log(`
rpm <command>\n
Usage:\n
rpm install/i           installs/updates all the modules in your projects
rpm install/i <foo>     install a rel module
rpm help                display this command
`)

    // Install command
    if (args[0] == "install" || args[0] == "i") {

        let length, total = 0;
        const start = new Date().getTime();

        let rpmB = `\x1b[43m\x1b[30m RPM \x1b[0m`
        console.log(rpmB, "rel package manager v" + version);

        const oxhr = new XMLHttpRequest();

        oxhr.open('GET', "http://localhost:80/module-length/" + args[1], true)

        oxhr.onreadystatechange = () => {
            if (oxhr.readyState == 4) {
                if (oxhr.responseText == "Not Found") return console.log(`\n\x1b[41m\x1b[37m ERR! \x1b[0m`, `Error: 404 Not Found: Module "${args[1]}" could not be located.`)            

                total = parseInt(oxhr.responseText);

                const xhr = new XMLHttpRequest();

                xhr.open('GET', 'http://localhost:80/modules/' + args[1], true);

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 3) {
                        const responseData = xhr.responseText;

                        length = responseData.split("\n").length;

                        if (args[2] == "write") console.log(responseData, "\n", "________________________________________________________________________________________________________________________")

                        else {
                            const percentage = (length / total) * 100;

                            console.update(rpmB + " Downloading... " + percentage.toFixed(2) + `% [${"#".repeat(length)}${"-".repeat(total - length)}]`)
                        }
                    } else if (xhr.readyState === 4) {
                        console.update(rpmB + " Downloading... " + `100% [${"#".repeat(length)}]`)
                        let location = path.join("C:\\Program Files\\rel", "./rel_modules/" + args[1] + ".js");

                        if (xhr.responseText == "Not Found") return;

                        fs.writeFile(location, xhr.responseText, (err) => {
                            if (err) {
                                console.log("\n")
                                console.log(`\x1b[41m\x1b[37m ERR! \x1b[0m`, `Error: EPERM: Permission denied, open ${location}`)
                                console.log(`\x1b[41m\x1b[37m ERR! \x1b[0m`, "Make sure to spawn command instance as administrator.")
                                return
                            }

                            const timeTaken = new Date().getTime() - start;

                            console.log("\n")
                            console.log(rpmB + " Finished in " + timeTaken + "ms")
                        })
                    }
                };

                xhr.send()
            }
        }

        oxhr.send()
    }
})();