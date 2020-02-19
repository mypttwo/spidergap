'use strict';


const deepClone = (obj) => {
    let output, m, key;
    output = Array.isArray(obj) ? [] : {};
    for (key in obj) {
        m = obj[key];
        output[key] = (typeof m === "object") ? deepClone(m) : m;
    }
    return output;
 }

 module.exports = deepClone;