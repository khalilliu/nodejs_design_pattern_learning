"use strict";

const fs = require('fs');
const split = require('split');
const through = require('through2');
const request = require('request');
const ParallelStream = require('./parallelStream');

const LimitedParallelStream = require('./parallelLimitedStream');

//并行无限制无序

// fs.createReadStream(process.argv[2])
// 	.pipe(split())
// 	.pipe(new ParallelStream( (url,enc,done,push) => {
// 		if(!url){return done()}
// 		request.head(url,(err,response) => {
// 			push(url+' is ' + (err? 'down' : 'up') + '\n');
// 			done()
// 		})
// 	} ))
// 	.pipe(fs.createWriteStream('result.txt'))
// 	.on('finish',()=>console.log('All url were checked'));


//并行限制无序
// fs.createReadStream(process.argv[2])
// 	.pipe(split())
// 	.pipe(new LimitedParallelStream(2,(url,enc,push,done) => {
// 		if(!url){return done()}
// 		request.head(url, (err,response)=>{
// 			push(url + ' is ' + (err ? 'down' : 'up') + '\n');
// 			done();
// 		})	
// 	}))
// 	.pipe(fs.createWriteStream('result.txt'))
// 	.on('finish',()=>console.log('All url were checked'))

//顺序发射
fs.createReadStream(process.argv[2])
	.pipe(split())
	.pipe(through.obj(function(url,enc,done){
		if(!url){return done()}
		request.head(url,(err,response)=>{
			this.push(url + ' is ' + (err ? 'down' : 'up') + '\n');
			done();   //调用done才会传递到下一个流,否则会阻塞在任务中
		})
	}))
	.pipe(fs.createWriteStream('result.txt'))
	.on('finish',()=>console.log('All url were checked'));

//并行限制按顺序
//const throughParallel = require('through2-parallel');

// fs.createReadStream(process.argv[2])
// 	.pipe(split())
// 	.pipe(throughParallel.obj({concurrency:2}, function(url,enc,done){
// 		if(!url){return done()}
// 		request.head(url,(err,response)=>{
// 			this.push(url + ' is ' + (err ? 'down' : 'up') + '\n');
// 			done();
// 		})
// 	}))
// 	.pipe(fs.createWriteStream('result.txt'))
// 	.on('finish',()=>console.log('All url were checked'));