'use strict';

module.exports.init = init;

function init(app, passport) {
  require('../contact/contact.route.js')(app);
  require('../technicians/technicians.route.js')(app);
  require('../users/users.route.js')(app, passport);
  // var routesPath = app.get('root') + '/app/routes';
  // app.use('/', require(routesPath + '/main'));
  // app.use('/auth', require(routesPath + '/authentication'));
  // app.use('/', require(routesPath + '/account'));
  // app.use('/', require(routesPath + '/users'));
}
