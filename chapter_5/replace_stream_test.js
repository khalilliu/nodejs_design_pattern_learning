

"use strict";

const ReplaceStream = require('./replace_stream');

const rs = new ReplaceStream('world','node.js');
rs.on('data',chunk=>console.log(chunk.toString()))

rs.write('hello world whatToShow');
rs.end();