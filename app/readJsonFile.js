'use strict';

let fs = require('fs');

const readFile = (fileWithPath) => {
    let data = fs.readFileSync(fileWithPath, 'utf8');
    return data;
}

module.exports = readFile;
