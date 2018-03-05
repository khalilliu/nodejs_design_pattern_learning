const lastCall = new Map();

module.exports = function *(next){
	const now = new Date();
	if(lastCall.has(this.ip) && now.getTime()-lastCall.get(this.ip).getTime()<2000){
		return this.status = 429;
	}
	yield next;

	//outbound
	lastCall.set(this.ip,now);
	this.set('X-RateLimit-Reset', now.getTime()+1000);
}