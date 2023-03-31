/*
    The module to create servers
*/

const express = require('express');
const path = require('path');
const http = require('http');

var myApp;

function createServer() {
    myApp = express();
    return myApp;
}

module.exports = { createServer }