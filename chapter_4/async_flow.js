
const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunc){
	function callback(err){
		if(err){
			generator.throw(err);
		}
		const results = [].slice.call(arguments,1);
		generator.next(results.length>1 ? results : results[0]); 
	}
	const generator = generatorFunc(callback);
	generator.next();
}



asyncFlow(function* (callback){
	const fileName = path.basename(__filename);
	const myself = yield fs.readFile(fileName,'utf8',callback);
	yield fs.writeFile(`clone_of_${fileName}`,myself,callback);
	console.log('Clone created');
})

