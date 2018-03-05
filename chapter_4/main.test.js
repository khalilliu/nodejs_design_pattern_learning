const path = require('path');
const utilities = require('./utilities');
const thunkify = require('thunkify');
const co = require('co');
const request = thunkify(require('request'));
const fs = require('fs');
const mkdirp = thunkify(require('mkdirp'));
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);
const nextTick = thunkify(process.nextTick);

// function* download(url) {
//   console.log('Downloading ' + url);
//   const response = yield request(url);
//   const body = response[1];
//   console.log(body);
//   return body;
// }

// co(function* () {
//   try {
//     yield spider(process.argv[2], 1);
//     console.log('Download complete');
//   } catch(err) {
//     console.log(err);
//   }
// });

const arr = ['arr','background']

co(function*(){
	for(let i =0;i<2;i++){
		while(true){
			yield console.log(arr[++i]);
		}
	}
})

