function createProxy(subject){
	const helloOrg = subject.hello;
	subject.hello = () => (helloOrg.call(this) + ' world c');

	return subject;
}

module.exports = createProxy;