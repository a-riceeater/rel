/*
    The frame module
*/

const { app, BrowserWindow } = require('electron');
const path = require("path")

function cw(height, width) {
    win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            devTools: false
        },
        resizable: false,
        frame: true,
        devTools: false,
        contextIsolation: false,
        enableRemoteModule: true,
        //icon: path.join(__dirname + '/relico.ico'),
    })

    win.loadFile("../website/index.html")

    // require('@electron/remote/main').enable(win.webContents)
}

module.exports = { cw }