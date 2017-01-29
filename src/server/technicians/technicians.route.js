var techniciansController = require('./technicians.controller');

module.exports = function(app){
  app.get('/api/technicians', techniciansController.getTechnicians);
};
