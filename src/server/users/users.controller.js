
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


// exports.loginUser = function(req, res){
//   users.countUser(req.body,
//       function (err, callback) {
//         if(err){
//           res.send(err);
//         }
//         res.json(callback);
//       }
//   );
// };
