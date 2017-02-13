var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
module.exports.loggedin = loggedin;
module.exports.logoutUser = logoutUser;
module.exports.success = success;

 function signupUser(req, res, next){

  passport.authenticate('local-signup', function (err, user, info){

      if (err) {
          return res.send('err');
      }else if (!user) {
          return res.send('name');
      }
      return res.send(true);

  })(req, res, next);
}//End passport local-signup

function loginUser (req, res, next){

  passport.authenticate('local-login', function (err, user, info){

      if(err){

          return res.send('err');
      }
      if (!user) {

          return res.send('errorcredentials');
      }
      req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }

          return res.send(user);
      });
  })(req, res, next);
}

function loggedin(req, res){
  console.log('LOGGEDIN ' + JSON.stringify(req.user));
  console.log('session ' + JSON.stringify(req.session));
  console.log(req.isAuthenticated());

  res.send(req.isAuthenticated() ? req.user : '0');
}

function success(req, res){
    console.log('SERVER SUCCESS!!!!');
    res.json(req.user);
}

function logoutUser(req, res){
  req.logOut();
  res.sendStatus(200);
}
