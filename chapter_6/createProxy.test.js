const createProxy = require('./createProxy_c');

class Greeter{
	hello() {
    return 'Hello';
  }

  goodbye(name) {
    return 'Goodbye ' + name;
  }

}

const greeter = new Greeter();

const proxy = createProxy(greeter);

console.log(proxy.hello());
console.log(proxy.goodbye('khalil'));
