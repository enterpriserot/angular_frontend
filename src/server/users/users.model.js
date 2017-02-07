'use strict';

var mysql = require('../config/config.db');
// var passwordHelper = require('../helpers/password');
// var _ = require('lodash');

var usersModel= {};

usersModel.insertUser = function(userData,callback){

    if (mysql.connection) {
        mysql.connection.query('INSERT INTO users SET ?', [userData], function(err, result) {
            if(err){
                throw err;
            }else{
                callback(result);
            }
        });
    }
};

usersModel.countUser = function (email,callback){

    if (mysql.connection) {
        mysql.connection.query('SELECT COUNT(*) AS count FROM users WHERE email LIKE ?', [email],
        function(error, rows) {
            if(error){
                throw error;
            }else{
                callback(rows);
            }
        });
    }
};

usersModel.getUser = function (email, callback){
console.log('GET USER');
    if(mysql.connection){
        mysql.connection.query('SELECT * FROM users WHERE email LIKE "'+ email+'"',
        function (error, rows){
            if (error){
              console.log('ERROR:');
              console.log(error);
              throw error;
            }else{
              console.log('ROWS:');
              console.log(rows);
              callback(rows);
            }
        });
    }
};

usersModel.signupUser = function (data, callback){
  console.log('USERS MODEL SIGNUP USER');
  console.log(data);
  if (mysql.connection) {
    console.log('IF MYSQL CONNECTION');
        mysql.connection.query('SELECT COUNT(*) FROM users WHERE email LIKE ?', [data.email],
        function(error, rows) {
            if(error){
              console.log('IF USERS MODEL');
                throw error;
            }else{
              console.log('ELSE USERS MODEL');
              console.log(rows[0]['COUNT(*)']);
              if(rows[0]['COUNT(*)'] >= 1){
                console.log('HA ENTRADO AL IF');

                callback(rows);
              }else{
                console.log('HA ENTRADO AL ELSE RESULT COUNT');
                if (mysql.connection) {
                    mysql.connection.query('INSERT INTO users SET ?', [data], function(err, result) {
                        if(err){
                            throw err;
                        }else{
                            // callback(result);
                            callback(rows);
                        }
                    });
                }
              }
                callback(rows);
            }
        });
    }
};

module.exports = usersModel;
