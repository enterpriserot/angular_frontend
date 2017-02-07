/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var environment = process.env.NODE_ENV;

var dotenv = require('dotenv');
dotenv.load({ path: './src/server/.env' });

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

require('./config/passport.js')(passport);

require('./contact/contact.route.js')(app);
require('./technicians/technicians.route.js')(app);
require('./users/users.route.js')(app);

//En una aplicación basada en Connect o Express, se requiere el middleware passport.
//initialize () para inicializar Passport. Si su aplicación utiliza sesiones
//de inicio de sesión persistentes, se debe utilizar el middleware passport.session ().
//Asegúrese de usar express.session () antes de passport.session () para asegurarse de
//que la sesión de inicio de sesión se restaure en el orden correcto.
app.use(session({secret: 'maytheforcebewithyou',
                resave: true,
                saveUninitialized: true,
                cookie : {secure: false, masAge: 120000}})); // session secret
app.use(passport.initialize());
app.use(passport.session());
/*----PASSPORT END----*/



console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
