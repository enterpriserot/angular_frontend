var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
module.exports.loginFb = loginFb;

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

  // passport.authenticate('local-login', { badRequestMessage: 'An error occurs' },function (err, user, info){
  passport.authenticate('local-login', function (err, user, info){

      if(err){
          return res.send('err');
      }else if (!user) {
          return res.send('errorcredentials');
      }

      return res.send(user);
  })(req, res, next);
}

function loginFb(req, res, next){

  passport.authenticate('facebook-login', function (err, user, info){

    if(err){
        return res.send('err');
    }else if (!user) {
        return res.send('errorcredentials');
    }
    
    return res.send(user);

  })(req, res, next);
}
