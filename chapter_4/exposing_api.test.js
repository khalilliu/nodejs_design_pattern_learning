const asyncDivision = require('./exposing_api.js');
asyncDivision(10,2,(err,result)=>{
	if(err){
		return console.error(err);
	}
	console.log(result);
})

asyncDivision(10,2)
	.then(result => console.log(result))
	.catch(error => console.error(error));
