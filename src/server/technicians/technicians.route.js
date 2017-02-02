var techniciansController = require('./technicians.controller');

module.exports = function(app){
  app.post('/api/technicians/', techniciansController.getTechnicians);
};
