"use strict";

const stream = require('stream');

/*
来看_transform()方法，在这个方法中，我们执行userTransform()函数，然后增加当前正在运行的任务个数; 最后，我们通过调用done()来通知当前转换步骤已经完成。_transform()方法展示了如何并行处理另一项任务。我们不用等待userTransform()方法执行完毕再调用done()。 相反，我们立即执行done()方法。另一方面，我们提供了一个特殊的回调函数给userTransform()方法，这就是this._onComplete()方法；以便我们在userTransform()完成的时候收到通知。

在Streams终止之前，会调用_flush()方法，所以如果仍有任务正在运行，我们可以通过不立即调用done()回调函数来延迟finish事件的触发。相反，我们将其分配给this.terminateCallback变量。为了理解Streams如何正确终止，来看_onComplete()方法。

在每组异步任务最终完成时，_onComplete()方法会被调用。首先，它会检查是否有任务正在运行，如果没有，则调用this.terminateCallback()函数，这将导致Streams结束，触发_flush()方法的finish事件
*/

class ParallelStream extends stream.Transform{
	constructor(userTransform){
		super({objectMode:true});
		this.userTransform = userTransform;
		this.running = 0;
		this.terminateCallback = null;
	}

	_transform(chunk,enc,done){
		this.running++;
		this.userTransform(chunk,enc,this._complete.bind(this),this.push.bind(this));
		done();
	}

	_complete(err){
		this.running--;
		if(err){return this.emit('error',err)}
		if(this.running == 0){
			this.terminateCallback&&this.terminateCallback();
		}
	}

	_flush(done){
		if(this.running>0){
			this.terminateCallback = done;
		}else{
			done();
		}
	}
}

module.exports = ParallelStream;