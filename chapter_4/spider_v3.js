"use strict"

const path = require('path');
const utilities = require('./utilities');

const request = utilities.promisify(require('request'));
const fs = require('fs');
const mkdirp = utilities.promisify(require('mkdirp'));
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);
const TaskQueue = require('./taskQueue');

let downloadQueue = new TaskQueue(2);


function spiderLink(currentUrl, body, nesting){
	if(nesting === 0){
		return promise.resolve();
	}
	const links = utilities.getPageLinks(currentUrl,body);

	if (links.length === 0) {return promise.resolve()};

	return new Promise((resolve,reject)=>{
		let completed = 0;
		let hasErrors = false;
		links.forEach(link => {
			let task = ()=>{
				return spider(link,nesting-1)
				.then(()=>{
					if(++completed === links.length){
						resolve();
					}
				})
				.catch(()=>{
					if(!hasErrors){
						hasErrors = true;
						reject();
					}
				})
			}
			taskQueue.pushTask(task);
		})
	})
}

//并发限制并发数模式
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


let spidering = new Map();
function spider(url,nesting,callback){
	if(spidering.has(url)){
		return Promise.resolve();
	}
	spidering.set(url,true);
	
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