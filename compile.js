#!/bin/env node

var fs = require('fs');

function file(name) {
    return fs.readFileSync('src/' + name + '.js', { encoding: 'utf8' });
}

fs.writeFileSync('dist/Doxastic.js',
    file('Doxastic').replace(/\/\/\s+import\s+(\w*)/g, function(_, match) {
        return file(match);
    })
);
