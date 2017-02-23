var usersController = require('./users.controller');
var passport = require('passport');

module.exports = function(app) {
  app.post('/api/login', usersController.loginUser);
  app.post('/api/signup', usersController.signupUser);
  app.get('/api/loggedin', usersController.loggedin);
  app.post('/api/logout', usersController.logoutUser);

  /*----FACEBOOK----*/
  app.get('/api/facebook',
      passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
  app.get('/api/auth/facebook/callback',
      passport.authenticate('facebook',
      { successRedirect: '/sociallogin', failureRedirect: '/' }));

  /*----TWITTER----*/
  app.get('/api/twitter', passport.authenticate('twitter'));
  app.get('/api/auth/twitter/callback',
      passport.authenticate('twitter',
      { successRedirect: '/sociallogin', failureRedirect: '/' }));

  /*----GOOGLE----*/
  app.get('/api/google', passport.authenticate('google', { scope: 'profile email' }));
  app.get('/api/auth/google/callback',
      passport.authenticate('google',
      { successRedirect: '/sociallogin', failureRedirect: '/' }));

  /*----ROUTE TO RETURN SOCIAL LOGGED USER----*/
  app.get('/api/auth/success', usersController.success);

};
