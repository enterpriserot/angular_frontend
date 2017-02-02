var users = require('./users.model');

exports.loginUser = function(req, res){
  users.loginUser(req.body,
    function (err, user) {
      if(err){
        res.send(err);
      }
      res.json(user);
    });
};
