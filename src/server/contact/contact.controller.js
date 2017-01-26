var email = require('../utils/email.js');

exports.sendEmailContact = function(req, res){
  // req.body.type = 'admin';
  email.sendEmail(req,res);
  // req.body.type = 'user';
};
