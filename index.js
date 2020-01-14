#!/usr/bin/env node
const yargs = require('yargs');
const util = require('./util');
const lightoj = require('./lightoj');
const rcManager = require('./rcmanager');

const rc = rcManager.getRC();

const options = yargs
    .usage("Usage: -f <name>, if provided, will submit else will check for verdict")
    .usage("Usage: -d <directory>")
    .usage("Usage: -u <username>")
    .usage("Usage: -p <password>")
    .usage("Usage: -i <problemId>")
    .option("f", { alias: "file", describe: "File Name", type: "string", demandOption: false })
    .option("u", { alias: "username", describe: "Username", type: "string", demandOption: false })
    .option("p", { alias: "password", describe: "Password", type: "string", demandOption: false })
    .option("i", { alias: "problemId", describe: "ProblemId", type: "string", demandOption: true })
    .option("d", { alias: "directory", describe: "Directory", type: "string", demandOption: false })
    .argv;

const username = options.username || rc.Username;
const password = options.password || rc.Password;

if (!username || !password) {
    console.error('Please provide username and password');
    process.exit(-1);
}

const type = (!options.file ? 1 : 0);

if (type) {
    lightoj.checkIfSolved(username, password, options.problemId).then(r => {
        console.log(r);
    });
} else {
    const pwd = options.path || process.env.PWD;
    const path = pwd + "/" + options.file;
    if (util.fileExists(path)) {
        const fileContent = util.readContent(path);
        lightoj.submit(username, password, fileContent, options.problemId).then(r => {
            console.log(r);
        });
    } else {
        console.error('file not found');
    }
}