var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var sql = require('../users/users.model');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta

//exporta la libreria de funciones
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    // passport.serializeUser(function (user, done) {
    //     done(null, user.id);
    // });

    passport.serializeUser(function(user, done) {
      console.log(user);
       done(null, {
          id: user['id'],
          userName: user['name'],
          email: user['email']
       });
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        // sql.getUser(id, function (error, rows) {
        //     done(error, rows[0]);
        console.log(user);
        done(null, user);
        // });
    });

    // =========================================================================
   // LOCAL SIGNUP ============================================================
   // =========================================================================
   // we are using named strategies since we have one for login and one for signup
   // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
                    function (req, email, password, done) {
                        console.log('FUNCTION SIGNUP');
                        sql.countUser(email, function (rows) {
                            if (rows[0].count >= 1) {
                                return done(null, false, 'e-mail is in use in our database');
                            } else {
                                // if there is no user with that email
                                // create the user
                                var newUser = {
                                    email: email,
                                    password: bcrypt.hashSync(password, null, null),
                                    name: req.body.name/*,
                                    usertype: req.body.usertype*/
                                };

                                sql.insertUser(newUser, function (rows) {
                                    if (rows) {
                                        return done(null, email);
                                    }
                                });//fin de consulta
                            }//fin del else
                        });//fin de count
                    }));//fin de local


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
                    function (req, user, password, done) {
                      console.log('76 passport use');
                        sql.getUser(user, function (error, rows) {
                          console.log('PASSPORT.JS SQL GET USER');
                          console.log(rows);
                            if (!rows.length) {
                                console.log('PASSPORT.JS IF !ROWS LENGTH');
                                return done(null, false, 'nouser');
                            }
                            if (!bcrypt.compareSync(password, rows[0].password)) {
                                console.log('PASSPORT.JS IF !BCRYPT COMPARESYNC');
                                return done(null, false, 'wrongpassword');
                            } else {

                                return done(null, rows[0]);
                            }
                        });

                    })
            );

    // passport.use(new FacebookStrategy({
    //     clientID: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET,
    //     // callbackURL: '/auth/facebook/callback',
    //     callbackURL: 'http://127.0.0.1:3000/api/auth/facebook/callback',
    //     profileFields: ['id', 'displayName', 'name', 'email', 'link', 'locale', 'timezone', 'photos']/*,
    //     passReqToCallback: true*/
    //   }, function(accessToken, refreshToken, profile, cb) {
    //     // }, function(req, accessToken, refreshToken, profile, cb) {
    //
    //     // console.log(accessToken);
    //     // console.log(refreshToken);
    //     console.log(profile);
    //     // console.log(cb);
    //     // req.user = profile.name;
    //     // console.log(req.user);
    //     return cb( null, profile);
    //   }));

    passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://127.0.0.1:3000/api/auth/facebook/callback',

  profileFields: ['id', 'displayName', 'name', 'gender','photos']
  },
  function(accessToken, refreshToken, profile, cb) {
    /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
    return cb(null, profile);
  }
));
};
