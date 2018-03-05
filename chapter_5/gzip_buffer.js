const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];
const path = require('path');

fs.readFile(path.basename(__filename),(err,buffer)=>{
	zlib.gzip(buffer,(err,buffer)=>{
		fs.writeFile(path.basename(__filename)+'.gz',buffer,err=>{
			console.log('File successfully compressed');
		})
	})
})