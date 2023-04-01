/*
    The module to create servers
*/

const express = require('express');
const path = require('path');
const http = require('http');
const errors = require("../errors")

var myApp;

function createServer() {
    myApp = express();
    return myApp;
}



function routeFile(u, f) {
    if (!myApp) process.exit(); // throw error of no server later
    console.log(u, f)

    myApp.get(u, (req, res) => {
        console.log("Routed " + u + " to " + f)
        res.sendFile(path.join(__dirname, `../../` + f));
    })
}

function listen(port) {
    if (!port) {
        console.log(FgRed + "TypeError: Program exited with exit status 4:");
        console.log("   Undefined: No port name specified");
        process.exit()
    }
    if (!myApp) {
        console.log(FgRed + "TypeError: Program exited with exit status 4:");
        console.log("   Undefined: No existing server");
        process.exit()
    }

    myApp.listen(parseInt(port), () => {
        return true;
    })
}

module.exports = { createServer, routeFile, listen }