const fs = require('fs');
function readJSON(filename,callback){
	fs.readFile(filename,(err,data)=>{
		let parsed;
		if(err){
			return callback(err);
		}

		// try{
		// 	parsed = JSON.parse(data);
		// }catch(err){
		// 	return callback(err);
		// }

		callback(null,JSON.parse(data));
	})
}

readJSON(`data.txt`,err=>console.log(err));