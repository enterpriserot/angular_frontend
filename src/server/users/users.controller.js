var users = require('./users.model');

exports.loginUser = function(req, res){
  users.countUser(req.body,
      function (err, callback) {
        if(err){
          res.send(err);
        }
        res.json(callback);
      }
  );
};
