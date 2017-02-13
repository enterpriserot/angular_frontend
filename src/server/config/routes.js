'use strict';

module.exports.init = init;

function init(app, passport) {
  require('../contact/contact.route.js')(app);
  require('../technicians/technicians.route.js')(app);
  require('../users/users.route.js')(app, passport);
}
