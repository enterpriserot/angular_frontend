var usersController = require('./users.controller');

module.exports = function(app){
  app.get('/api/login', usersController.loginUser);
};
