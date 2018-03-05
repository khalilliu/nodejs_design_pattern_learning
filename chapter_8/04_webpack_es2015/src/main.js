
window.addEventListener('load',function(){
	var sayHello = require('./sayHello').sayHello;
	var hello = sayHello('Broswer');
	var body = document.getElementsByTagName("body")[0];
	body.innerHTML = hello;
})