var usersController = require('./users.controller');
// var bodyParser = require('body-parser');
//
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
  // app.get('/api/login', usersController.loginUser);
  app.post('/api/login', usersController.loginUser);
  app.post('/api/signup', usersController.signupUser);
  app.get('api/loginfb', usersController.loginFb);
};
