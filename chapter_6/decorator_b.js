function decorate(component){
	component.greetings = function(){
		return 'hi!';
	}

	return component;
}

class Greeter{
	hello(subject){
		return `hello ${subject}`
	}
}

const decoratedGreeter = decorate(new Greeter());
console.log(decoratedGreeter.hello('world')); // uses original method
console.log(decoratedGreeter.greetings()); // uses new method