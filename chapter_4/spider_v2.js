"use strict"

const path = require('path');
const utilities = require('./utilities');

const request = utilities.promisify(require('request'));
const fs = require('fs');
const mkdirp = utilities.promisify(require('mkdirp'));
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);


function spiderLink(currentUrl, body, nesting){
	let promise = Promise.resolve();
	if(nesting === 0){return promise};
	const links = utilities.getPageLinks(currentUrl,body);
	const promises = links.map(link => spider(link,nesting-1))
	return promise.all(promises);
}

//并发模式
/*=========================================
let tasks = [];

==========================================*/

function saveFile(filename, content, callback){
	mkdirp(path.dirname(filename), err=>{
		if(err){
			return callback(err);
		}
		fs.writeFile(filename, content, callback);
	})
}

function download(url, filename, callback){
	console.log(`Downloading ${url}`);
	let body;
	return request(url)
		.then(response => {
			body = response.body;
			return mkdirp(path.dirname(filename));
		})
		.then(()=>writeFile(filename,body))
		.then(()=>{
			console.log(`Downloaded and saved: ${url}`);
			return body;
		})
}


function spider(url,nesting,callback){
	const filename = utilities.urlToFilename(url);
	return readFile(filename,'utf8')
		.then(
			(body) => (spiderLink(url,body,nesting)),
			(err) => {
				if(err.code!=='ENOENT'){throw err;}
				return download(url,filename)
					.then(body => spiderLink(url,body,nesting))
			}
		)
}

spider(process.argv[2], 1)
	.then(()=>console.log('Download complete'))
	.catch(err => console.log(err));