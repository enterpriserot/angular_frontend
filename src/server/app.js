/*jshint node:true*/
'use strict';

var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var environment = process.env.NODE_ENV;
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.load({ path: './src/server/.env' });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

require('./config/passport.js')(passport);

app.use(session({
                secret: 'maytheforcebewithyou',
                resave: true,
                saveUninitialized: true,
                cookie : {secure: false}})); // session secret
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes.js').init(app, passport);

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
    console.log('WARNING: OPEN BROWSER WITH HTTPS');
    https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.crt')
    }, app).listen(port);

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
    app.listen(port, function() {
      console.log('Express server listening on port ' + port);
      console.log('env = ' + app.get('env') +
      '\n__dirname = ' + __dirname +
      '\nprocess.cwd = ' + process.cwd());
    });
    break;
}
