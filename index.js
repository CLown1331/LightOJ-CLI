#!/usr/bin/env node
const yargs = require('yargs');
const readContent = require('./util').readContent;
const lightoj = require('./lightoj');

const options = yargs
    .usage("Usage: -f <name>")
    .usage("Usage: -d <directory>")
    .usage("Usage: -u <username>")
    .usage("Usage: -p <password>")
    .usage("Usage: -i <problemId>")
    .option("f", { alias: "file", describe: "File Name", type: "string", demandOption: true })
    .option("u", { alias: "username", describe: "Username", type: "string", demandOption: true })
    .option("p", { alias: "password", describe: "Password", type: "string", demandOption: true })
    .option("i", { alias: "problemId", describe: "ProblemId", type: "string", demandOption: true })
    .option("d", { alias: "directory", describe: "Directory", type: "string", demandOption: false })
    .argv;

const pwd = options.path || process.env.PWD;
const path = pwd + "/" + options.file;
const fileContent = readContent(path);

lightoj.submit(options.username, options.password, fileContent, options.problemId).then(r => {
    console.log(r);
});