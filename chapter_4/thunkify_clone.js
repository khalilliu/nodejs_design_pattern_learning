
module.exports = thunkify;

function thunkify(fn) {
	// body...
	return function(){
		var args = new Array(arguments.length);
		var ctx = this;

		for(var i=0;i<args.length;++i){
			args[i] = arguments[i]
		}

		return function thunk(done){
			var called;

			args.push(function(){
				if(called)return;
				called = true;
				done.apply(null,arguments);
			});

			try {
				fn.apply(ctx, args);
			} catch(e) {
				console.log(e);
			}
		}
	}
}


//example
/*
fs.readFile(filename,options,callback)  -> fn
(1) 返回一个函数 function(filename,options){...}
return function(){ 
	var args = [...Array.from(arguments)]; var ctx = this; 

}  
(2) 返回一个函数 function(callback){ fn.apply( ctx  , args) } //args (filename,options, func(callback) )
function(callback){
	var called;
	args.push( 
		function cb(){
			if(called)return; 
			called = true;  //invoke only once
			callback.apply(null,arguments) //arguments -> from "cb" in this case "[err,result]"
		} 
	)   // func(callback) -> new callback -> new func{(err,result)=> {}}

	try(fn.apply(ctx,args))  

}

read = thunkify(fs.readFile);

read(filename,options) -> thunk = (callback)=>{fs.readFile(filename,options,callback)}
*/