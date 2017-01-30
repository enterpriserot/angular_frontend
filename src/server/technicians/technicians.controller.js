var technicians = require('./technicians.model');

exports.getTechnicians = function(req, res){
  technicians.getTechnicians(
    function (err, technicians) {
      if(err){
        res.send(err);
      }
      res.json(technicians);
    });
};
