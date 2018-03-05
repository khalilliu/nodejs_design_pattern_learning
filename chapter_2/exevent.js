const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class FindPattern extends EventEmitter{
	constructor(regex){
		super();
		this.regex = regex;
		this.files = [];
	}

	addFile(file){
		this.files.push(file);
		return this;
	}

	find(){
		this.files.forEach(file => {
			fs.readFile(file,'utf8',(err,content)=>{
				if(err){
					return this.emit('error',console.log(`error ${err}`));
				}
				this.emit('fileread',file);
				let match;
				if(match = content.match(this.regex)){
					match.forEach(elem => this.emit('found',file,elem));
				}
			})
		})
		return this;
	}
}

const filePatternObject = new FindPattern(/hello \w+/);
filePatternObject
	.addFile('fileA.txt')
	.addFile('fileB.txt')
	.find()
	.on('fileread',file=>console.log(`${file} has been read`))
	.on('found',(file,match)=>console.log(`Matched "${match}" in file ${file}`))
	.on('error',err => console.log(`Error emitted ${err.message}`));