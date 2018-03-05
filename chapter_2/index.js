function add(a,b,callback){
	callback(a+b);
}

function asyncAdd(a,b,callback){
	setTimeout(()=>{return callback(a+b)},100);
}


console.log('before');
asyncAdd(3,3,(result)=>console.log(`result is ${result}`));
add(1,2,(result)=>console.log(`result is ${result}`));
console.log('after');


const result = [1,5,7].map(ele=>ele-1);
console.log(result);

//unpredictable function
//make api async using `process.nextTick`
const fs = require('fs');
const cache = {};
function inconsistentRead(filename,callback){
	if(cache[filename]){
		process.nextTick( () => callback(cache[filename]) )
	}else{
		//solution#1
		fs.readFile(filename, 'utf-8',(err,data)=>{
			cache[filename] = data;
			callback(data);
		})
	}
}


//unleadshing zalgo
function createFileReader(filename){
	const listeners = [];
	inconsistentRead(filename, value => {
		listeners.forEach(listener => listener(value))
	})

	return {
		onDataReady: listener => listeners.push(listener)
	}
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
	console.log('first call data:' + data);
	const reader2 = createFileReader('data.txt');
	reader2.onDataReady(data => {
		console.log('second call data:' + data);
	})
})
