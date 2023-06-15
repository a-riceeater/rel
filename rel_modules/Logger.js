/*
    The module for logging
*/ 

const manager = require("../managers")

function println(message) {
    //console.log(manager.isVariable(message) ? message : message.substring(1, message.length - 1));
    console.log(message)
    return true;
}


const prompt = require('prompt-sync')();
function inputRead(message) {
    const p = prompt(manager.isVariable(message) ? message : message.substring(1, message.length - 1))
    if (!p) process.exit();
    return p;
}

module.exports = { println, inputRead }