const fs = require('fs');

const fileExists = (filePath) => {
    return fs.existsSync(filePath);
}

const readContent = (filePath) => {
    return fs.readFileSync(filePath, 'utf-8');
}

const writeContent = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

const isString = (x) => {
    return Object.prototype.toString.call(x) === "[object String]"
}

const flatten = (array) => {
    return [].concat.apply([], array)
}

module.exports = {
    readContent,
    writeContent,
    isString,
    flatten,
    fileExists
}