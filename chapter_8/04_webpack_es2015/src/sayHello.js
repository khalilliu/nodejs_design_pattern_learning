
var mustache = require('mustache');
var template = '<h1>Hello <i>{{name}}</i></h1>';
mustache.parse(template);

module.exports.sayHello = (toWhom) => (mustache.render(template, {name: toWhom}))