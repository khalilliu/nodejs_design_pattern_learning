const EventEmitter = require('events');

module.exports = class Roee extends EventEmitter{
	constructor(excutor){
		super();
		const emit = this.emit.bind(this);
		this.emit = undefined;
		excutor(emit);
	}
}

