/*
    The module for logging
*/ 

const manager = require("../managers")

function println(message) {
    console.log(manager.isVariable(message) ? message : message.substring(1, message.length - 1));
    return true;
}


const prompt = require('prompt-sync')();
function inputRead(message) {
    // handle this later
    prompt(manager.isVariable(message) ? message : message.substring(1, message.length - 1));
}

module.exports = { println, inputRead }