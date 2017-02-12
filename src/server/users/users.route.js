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
  // app.get('/api/facebook', usersController.facebook);
  app.get('/api/facebook',
      passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
  // app.get('/api/auth/facebook/callback', usersController.facebook);
  app.get('/api/auth/facebook/callback',
      passport.authenticate('facebook',
      { successRedirect: '/admin', failureRedirect: '/' }));

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
