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
       done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        done(null, user);
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
                                //Inserts the new user into users table
                                sql.insertUser(newUser, function (rows) {
                                    if (rows) {
                                        return done(null, email);
                                    }
                                });//inser end
                            }//else
                        });//count end
                    }));//local signup end


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
                        //Gets the user from the database
                        sql.getUser(user, function (error, rows) {

                            if (!rows.length) {

                                return done(null, false, 'nouser');
                            }//Compare the password with the password encrypted in database
                            if (!bcrypt.compareSync(password, rows[0].password)) {

                                return done(null, false, 'wrongpassword');
                            } else {

                                return done(null, rows[0]);
                            }
                        });

                    })
            );

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'name', 'email', 'link', 'locale', 'photos'],
        passReqToCallback: true
      }, function(req, accessToken, refreshToken, profile, done) {

        //Search for the user in database
        sql.countUser(profile.id, function (rows){

              if(rows[0].count === 0){ //If the user is not found
                console.log('USUARIO NO EXISTE');
                var user = {
                    email: profile.id,
                    name: profile.name.givenName,
                    surnames: profile.name.familyName,
                    avatar: profile.photos[0].value,
                    type: user
                };

                //Insert the user to users table in database
                sql.insertUser(user, function(rows){
                    if(rows){
                        return done(null, rows);
                    }
                });

              }else { //If user is found
                console.log('USER EXISTS');
                //Gets the user from users table
                sql.getUser(profile.id, function(error, rows){
                    if(!rows.negth){
                        return done(null, false, 'nouser');
                    }else{
                        return done(null, rows[0]);
                    }
                });
              }
        });

        // req.user = profile.name;
        // console.log(req.user);
        // return done( null, profile);
      }));

    // passport.use(new FacebookStrategy({
    //     clientID: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET,
    //     callbackURL: 'http://127.0.0.1:3000/api/auth/facebook/callback',
    //     profileFields: ['name', 'id', 'displayName', 'gender','photos'],
    //     passReqToCallback: true
    //   },
    //   function(req, accessToken, refreshToken, profile, done) {
    //     console.log('PASSPOSR USE');
    //     /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });*/
    //     return done(null, profile);
    //   }
    // ));

  //   passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_ID,
  //   clientSecret: process.env.FACEBOOK_SECRET,
  //   callbackURL: 'http://127.0.0.1:3000/api/auth/facebook/callback',
  //   profileFields: ['name', 'email', 'link', 'locale', 'photos', 'timezone'],
  //   passReqToCallback: true
  //   // profileFields: ['id', 'displayName', 'name', 'gender','photos']
  // }, function(req, accessToken, refreshToken, profile, done) {
  //       /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //         return cb(err, user);
  //       });*/
  //       console.log('FACEBOOK STRATEGY 1');
  //       sql.countUser(profile.id, function (rows) {
  //
  //       });
  //
  //       return done(null, profile);
  //     }
  //   ));

    // passport.use('facebookcallback',new FacebookStrategy({
    // clientID: process.env.FACEBOOK_ID,
    // clientSecret: process.env.FACEBOOK_SECRET,
    // callbackURL: 'http://127.0.0.1:3000/api/auth/facebook/callback',
    //
    //   profileFields: ['id', 'displayName', 'name', 'gender','photos']
    //   },
    //   function(accessToken, refreshToken, profile, done) {
    //     console.log('FACEBOOK CALLBACK SERVER');
    //     /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });*/
    //     console.log('refreshToken:');
    //     console.log(refreshToken);
    //     console.log('profile:');
    //     console.log(profile);
    //     console.log('accessToken:');
    //     console.log(accessToken);
    //     return done(null, profile);
    //     // return cb.redirech('/admin');
    //   }
    // ));

};
