const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const server = http.createServer((req,res)=>{
	let filename = req.headers.filename;
	filename =`new_${filename}`
	console.log('File request received: ' + filename);
	req
		.pipe(crypto.createDecipher('aes192','a_shared_secret'))
		.pipe(zlib.createGunzip())  //解压
		.pipe(fs.createWriteStream(filename)) //写入
		.on('finish',()=>{
			res.writeHead(201,{
				'Content-Type':'text/plain'
			});
			res.end('done');
			console.log(`File saved: ${'new'+filename}`)
		})
})

server.listen(3000,()=>{console.log('listening')})