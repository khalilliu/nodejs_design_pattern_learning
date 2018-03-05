const Express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');


let app = module.exports = new Express();
app.use(bodyParser.json());

const svcLoc = require('./lib/serviceLocator')();

svcLoc.register('dbName','example-db');
svcLoc.register('tokenSecret','SHHH!');
svcLoc.factory('db',require('./lib/db'));
svcLoc.factory('authService',require('./lib/authService'));
svcLoc.factory('authController',require('./lib/authController'));

const authController = svcLoc.get('authController');

// const db = dbFactory('example-db');
// const authService = authServiceFactory(db,'SHHH!');
// const authController = authControllerFactory(authService);

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

app.use(errorHandler());
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
})