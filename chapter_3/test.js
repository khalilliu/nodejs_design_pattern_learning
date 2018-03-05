function asyncOperation(callback){
	// process.nextTick(callback);
	setTimeout(callback,1000)
}

function task1(callback){
	console.log((new Date()).getUTCSeconds());
	asyncOperation(()=>{
		task2(callback)
	})
}

function task2(callback){
	asyncOperation(()=>{
		task3(callback)
	})
}

function task3(callback){
	asyncOperation(()=>{
		console.log((new Date()).getUTCSeconds())
		callback()
	})
}

task1(()=>{
	console.log('done')
})



