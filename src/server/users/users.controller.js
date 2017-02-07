var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;

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
        console.log(err);
        console.log(user);
        console.log(info);
      if(err){
        console.log('IF ERR');
          return res.send('err');
      }
      if (!user) {
        console.log('IF !USER');
          return res.send('errorcredentials');
      }
      console.log('RETURN SEND USER');
      return res.send(user);
  })(req, res, next);
}
