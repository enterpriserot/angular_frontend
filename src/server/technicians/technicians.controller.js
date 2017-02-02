var technicians = require('./technicians.model');

exports.getTechnicians = function(req, res){
  technicians.getTechnicians(req.body,
    function (err, technicians) {
      if(err){
        res.send(err);
      }
      res.json(technicians);
    });
};
