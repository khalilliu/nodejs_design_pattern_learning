const fs = require('fs');
const zlib = require('zlib');
const file = require('path').basename(__filename);

fs.createReadStream(file)
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream(file+'.gz'))
	.on('finish',()=>console.log('File successfully compressed'));