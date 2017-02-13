var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var sql = require('../users/users.model');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//exporta la libreria de funciones
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
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
                        // console.log('FUNCTION SIGNUP');
                        sql.countUser(email, function (rows) {
                            if (rows[0].count >= 1) {
                                return done(null, false, 'e-mail is in use in our database');
                            } else {
                                // if there is no user with that email
                                // create the user
                                var newUser = {
                                    email: email,
                                    password: bcrypt.hashSync(password, null, null),
                                    name: req.body.name,
                                    avatar: 'images/avatar.png'
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
    //Passport strategy to connect locally
    passport.use('local-login', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
                },
                    function (req, user, password, done) {
                      // console.log('before sql');
                        //Gets the user from the database
                        sql.getUser(user, function (error, rows) {

                            if (!rows.length) {
                              // console.log('without user');
                                return done(null, false, 'nouser');
                            }//Compare the password with the password encrypted in database
                            if (!bcrypt.compareSync(password, rows[0].password)) {

                                return done(null, false, 'wrongpassword');
                            } else {

                                return done(null, rows[0]);
                            }
                        });
                    }));//LocalStrategy end

    //Passport strategy to connect with Facebook
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['id', 'displayName', 'name', 'email', 'link', 'locale', 'photos'],
        passReqToCallback: true
      }, function(req, accessToken, refreshToken, profile, done) {

        //Search for the user in database
        sql.countUser(profile.id, function (rows){

              if(rows[0].count === 0){ //If the user is not found
                // console.log('USUARIO NO EXISTE');
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
                      // console.log('USER:');
                      // console.log(user);
                      // console.log('ROWS:');
                      // console.log(rows);
                        return done(null, user);
                    }
                });

              }else { //If user is found
                console.log('USER EXISTS');
                //Gets the user from users table
                sql.getUser(profile.id, function(error, rows){
                    if(!rows.length){
                        return done(null, false, 'nouser');
                    }else{
                      // console.log('ELSE:');
                      // console.log(rows[0]);
                        return done(null, rows[0]);
                    }
                });
              }
        });
      }));//FacebookStrategy end

      passport.use(new TwitterStrategy({
          consumerKey: process.env.TWITTER_KEY,
          consumerSecret: process.env.TWITTER_SECRET,
          callbackURL: process.env.TWITTER_CALLBACK,
          passReqToCallback: true
        }, function(req, token, tokenSecret, profile, done) {

          // console.log('TWITTER PROFILE:');
          // console.log(profile);
          // console.log('FOTO:');
          // console.log(profile._json.profile_image_url);
          // console.log('TWITTER DISPLAY NAME:');
          // console.log(profile.displayName);

          //Search for the user in database
          sql.countUser(profile.id, function (rows){

                if(rows[0].count === 0){ //If the user is not found
                  // console.log('USUARIO NO EXISTE');
                  var user = {
                      email: profile.id,
                      name: profile.username,
                      surnames: 'default',
                      avatar: profile._json.profile_image_url,
                      type: user
                  };

                  //Insert the user to users table in database
                  sql.insertUser(user, function(rows){
                      if(rows){

                          return done(null, user);
                      }
                  });

                }else { //If user is found
                  // console.log('USER EXISTS');
                  //Gets the user from users table
                  sql.getUser(profile.id, function(error, rows){
                      if(!rows.length){
                          return done(null, false, 'nouser');
                      }else{
                        // console.log('ELSE:');
                        // console.log(rows[0]);
                          return done(null, rows[0]);
                      }
                  });
                }
          });
        }));//TwitterStrategy end

        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_KEY,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
            passReqToCallback: true
          }, function(req, token, refreshToken, profile, done) {

            // console.log('EMAIL:');
            // console.log(profile.emails[0].value);
            // console.log('GOOGLE PROFILE:');
            // console.log(profile);

            //Search for the user in database
            sql.countUser(profile.id, function (rows){

                  if(rows[0].count === 0){ //If the user is not found
                    // console.log('USUARIO NO EXISTE');
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
                          // console.log('USER:');
                          // console.log(user);
                          // console.log('ROWS:');
                          // console.log(rows);
                            return done(null, user);
                        }
                    });

                  }else { //If user is found
                    // console.log('USER EXISTS');
                    //Gets the user from users table
                    sql.getUser(profile.id, function(error, rows){
                        if(!rows.length){
                            return done(null, false, 'nouser');
                        }else{
                          // console.log('ELSE:');
                          // console.log(rows[0]);
                            return done(null, rows[0]);
                        }
                    });
                  }
            });
          }));//GoogleStrategy end
};
