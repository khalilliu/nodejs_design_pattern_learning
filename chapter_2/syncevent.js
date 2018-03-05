const EventEmitter = require('events').EventEmitter;

class SyncEmit extends EventEmitter{
	constructor(){
		super();
		setTimeout(()=>this.emit('ready'),0);
	}
}

const syncEmit = new SyncEmit();
syncEmit.on('ready',()=>console.log('Object is ready to use'));

function helloEvent(){
	const eventEmitter = new EventEmitter();
	setTimeout(()=>eventEmitter.emit('hello','hello world'),100);
	return eventEmitter;
}

function helloCallback(callback){
	setTimeout(()=>callback('hello world'),100);
}