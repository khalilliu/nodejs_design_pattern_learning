
const request = require('request');
const util = require('util');

//target
const statusUpdataService = {
	statusUpdates: {},  //{id: status}
	sendUpdate: function(status){
		console.log('Status sent: '+status);
		let id = Math.floor(Math.random()*1000000);
		statusUpdataService.statusUpdates[id] = status;
		return id;
	},

	destroyUpdate: id => {
		console.log('Status removed: ' + id);
		delete statusUpdataService.statusUpdates[id];
	}
};

//command
function createSendStatusCmd(service, status){
	let postId = null;

	const command = () => {
		postId = service.sendUpdate(status);
	}

	command.undo = () => {
		if(postId){
			service.destroyUpdate(postId);
			postId = null;
		}
	}

	command.serialize = () => {
		return {type:'status',action: 'post',status: status}
	}

	return command;
}

//invoker
class Invoker{
	constructor(){
		this.history = [];
	}

	run(cmd){
		this.history.push(cmd);
		cmd();
		console.log('command executed', cmd.serialize());
	}

	delay(cmd,delay){
		setTimeout(()=>{
			this.run(cmd);
		}, delay)
	}

	undo(){
		const cmd = this.history.pop();
		cmd.undo();
		console.log('command undone', cmd.serialize());
	}

	runRemotely(cmd){
		request.post('http://localhost:3000/cmd',
			{json: cmd.serialize()},
			err => {
				console.log('command executed remotely', cmd.serialize());
			}
		)
	}
}

//client code
const invoker = new Invoker();
const command = createSendStatusCmd(statusUpdataService, 'HI!');
invoker.run(command);
invoker.delay(command,1000*60*60);
invoker.undo();
invoker.runRemotely(command);