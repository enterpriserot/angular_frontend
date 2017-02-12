var usersController = require('./users.controller');
var passport = require('passport');
// var bodyParser = require('body-parser');
//
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
  // app.get('/api/login', usersController.loginUser);
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
  // app.get('/auth/facebook/callback',
  // passport.authenticate('facebook', { failureRedirect: '/login' }),
  // function(req, res) {
  //   console.log('Facebook login ' + JSON.stringify(req.user));
  //   res.redirect('/');
  // });
  // app.get('api/loginfb', usersController.loginFb);
//   app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
//   app.get('/auth/facebook/callback',
//         passport.authenticate('facebook', {
//             successRedirect : '/ping',
//             failureRedirect : '/ping'
//         }));
//   app.get('/ping', function(req, res, next) {
//     console.log(req.user);
//     res.send(req.user);
// });
};
