var passport = require('passport');

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
module.exports.loggedin = loggedin;
module.exports.facebook = facebook;
module.exports.logoutUser = logoutUser;
module.exports.facebookCallback = facebookCallback;

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
      console.log('PASSPORT AUTHENTICATE LOCAL LOGIN');
      if(err){
          console.log('PASSPORT AUTHENTICATE LOCAL LOGIN IF');
          return res.send('err');
      }else if (!user) {
          console.log('PASSPORT AUTHENTICATE LOCAL LOGIN ELSEIF');
          return res.send('errorcredentials');
      }

      return res.send(user);
  })(req, res, next);
}

function loggedin(req, res){
  console.log('LOGGEDIN');
  console.log(req.user);
  console.log(req.isAuthenticated());

  res.send(req.isAuthenticated() ? req.user : '0');

}

function facebook(req, res, next){
  console.log('FACEBOOOOOOOOK');
    passport.authenticate('facebook', function (err, user, info){
        if(err){
          return res.send('err');
        }else if(!user){
            return res.send('errorcredentials');
        }
        console.log(user);
        return res.send(user);
    })(req, res, next);

    res.send(req.user);
}

function facebookCallback(req, res, next){

 passport.authenticate('facebookcallback', function (err, user, info){
   console.log('facebookCallbackkkkkkkkkkkkkkkkkkkkkk');
     if (err) {
         return res.send('err');
     }else if (!user) {
         return res.send('errorcredentials');
     }
     return res.send(req.user);

 })(req, res, next);
}//End facebookCallback

// function facebook(req, res, next){
//
//   passport.authenticate('facebook', function (err, user, info){
//     console.log('LINEA 52 NODE FACEBOOK');
//     if(err){
//         return res.send('err');
//     }else if (!user) {
//         return res.send('errorcredentials');
//     }
//
//     res.redirect('/');
//     // return res.send(user);
//
//   })(req, res, next);
// }

function logoutUser(req, res){
  req.logOut();
  res.sendStatus(200);
}
