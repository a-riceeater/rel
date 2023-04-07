const path = require("path")
const fs = require('fs');
const manager = require("./managers");
const FgRed = "\x1b[31m"
const Reset = "\x1b[0m"

module.exports = { path, fs, FgRed, manager, Reset }