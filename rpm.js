const yargs = require('yargs');
const prompt = require("prompt-sync")({ sigint: false });
const path = require('path');
const cwd = process.cwd();
const fs = require("fs")