console.log('controller');
var technicians = require('./technicians.model');

exports.getTechnicians = function(req, res){
  console.log('controller');
  technicians.getTechnicians(
    function (err, technicians) {
      if(err){
        res.send(err);
      }
      console.log(technicians);
      res.json(technicians);
    });
};
