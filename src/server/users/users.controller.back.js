var users = require('./users.model');


exports.signupUser = function(req, res){

  users.signupUser(req.body,
      function (err, callback) {
        if(err){
          res.send(err);
        }
        res.json(callback);
      }
  );
};


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
