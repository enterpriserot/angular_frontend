
var passport = require('passport');

exports.signupUser = function(req, res, next){

  passport.authenticate('local-signup', function (err, user, info){

      if (err) {
          return res.send('err');
      }else if (!user) {
          return res.send('name');
      }
      return res.send(true);

  })(req, res, next);
};

exports.loginUser = function(req, res, next){
console.log(req.body);
  passport.authenticate('local-login', function (err, user, info){
        console.log(err);
        console.log(user);
        console.log(info);
      if(err){
          return res.send('err');
      }
      if (!user) {
          return res.send('errorcredentials');
      }
      return res.send(user);
  })(req, res, next);
};
