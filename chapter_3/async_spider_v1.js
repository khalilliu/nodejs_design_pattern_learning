const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const async = require('async');
const utilities = require('./utilities');

function spiderLinks(currentUrl, body,nesting,callback){
	if(nesting === 0){return process.nextTick(callback)}

	let links = utilities.getPageLinks(currentUrl,body);
	function iterate(index){
		if(index===links.length){
			return callback();
		}

		spider(links[index],nesting-1,(err)=>{
			if(err){return callback(err)}
			iterate(index+1);
		})
	}
	iterate(0)
}

function saveFile(filename,content,callback){
	mkdirp(path.dirname(filename),err=>{
		if(err){return callback(err)}
		fs.writeFile(filename,content,callback);
	})
}

function download(url,filename,callback){
	console.log(`Downloading ${url}`);
	let body;

	async.series([
		callback => {
			request(url,(err,response,resBody)=>{
				if(err){
					return callback(err)
				}
				body = resBody;
				callback();
			})
		},

		mkdirp.bind(null,path.dirname(filename)),

		callback => {
			fs.writeFile(filename,body,callback);
		}		
	], (err)=>{
		if(err){return callback(err)}
		console.log(`Downloaded and saved: ${url}`);
		callback(null,body);
	})
}

function spider(url, nesting, callback){
	const filename = utilities.urlToFilename(url);
	fs.readFile(filename,'utf8',(err,body)=>{
		if(err){
			if(err.code !=== 'ENOENT'){
				return callback(err);
			}
			return download(url,filename,(err,body)=>{
				if(err){return callback(err)}
				spiderLinks(url,body,nesting,callback)
			})
		}
		spiderLinks(url,body,nesting,callback)
	})
}

spider(process.argv[2],1,(err)=>{
	if(err){
		console.log(err);
		process.exit()
	}else{
		console.log('Download completed')
	}
})