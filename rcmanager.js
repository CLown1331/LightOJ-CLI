const util = require('./util');
const homedir = require('os').homedir();
const rcPath = homedir + '/.lightoj-cli';

const getRC = () => {
    let jsonData;
    if (util.fileExists(rcPath)) {
        jsonData = util.readContent(rcPath);
    } else {
        util.writeContent(rcPath, {});
        jsonData = util.readContent(rcPath);
    }
    return JSON.parse(jsonData);
}
module.exports = {
    getRC
};
