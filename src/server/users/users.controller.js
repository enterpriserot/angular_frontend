var users = require('./users.model');

exports.loginUser = function(req, res){
  users.loginUser(
    function (err, user) {
      if(err){
        res.send(err);
      }
      res.json(user);
    });
};
