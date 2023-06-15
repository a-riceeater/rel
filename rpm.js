const yargs = require('yargs');
const prompt = require("prompt-sync")({ sigint: false });
const path = require('path');
const cwd = process.cwd();
const fs = require("fs")
const pkgFetch = require('pkg-fetch');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const errors = require("./errors")

const updateLog = (message) => {
    process.stdout.clearLine(); // Clear the current console line
    process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
    process.stdout.write(message); // Write the new message
}

(async () => {
    // Create command-line arguments
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
        // Make a request to the server
        const xhr = new XMLHttpRequest();
        // xhr.open('GET', 'https://server-rel.darthvader1925.repl.co/current-version', true);

        let length, total = 0;
        const start = new Date().getTime();

        let rpmB = `${errors.BgYellow} RPM ${errors.Reset}`

        fetch("http://localhost:80/module-length/" + args[1])
            .then((d) => d.text())
            .then((d) => {
                total = d;

                xhr.open('GET', 'http://localhost:80/modules/' + args[1], true);
                console.log(rpmB, "Request sent...")

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 3) {
                        const responseData = xhr.responseText;

                        length = responseData.split("\n").length;

                        if (args[2] == "write") console.log(responseData, "\n", "________________________________________________________________________________________________________________________")

                        else {
                            const percentage = (length / total) * 100
                            updateLog(rpmB + " Downloading... " + percentage.toFixed(2) + `% [${"#".repeat(length)}]`)
                        }
                    } else if (xhr.readyState === 4) {
                        const responseData = xhr.responseText;

                        fs.writeFile(path.join("C:\\Program Files\\rel", "./rel_modules/" + args[1] + ".js"), responseData, (err) => {
                            if (err) throw err;


                            const timeTaken = new Date().getTime() - start;

                            console.log("\n")
                            console.log(rpmB + " Finished in " + timeTaken + "ms")
                        })
                    }
                };

                xhr.send()
            })
    }
})();