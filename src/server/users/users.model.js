'use strict';

var mysql = require('../config/config.db');
// var passwordHelper = require('../helpers/password');
// var _ = require('lodash');

var usersModel= {};

usersModel.insertUser = function(userData,callback){

    if (mysql.connection) {
        mysql.connection.query('INSERT INTO users SET ?', userData, function(err, result) {
            if(err){
                throw err;
            }else{
                callback(result);
            }
        });
    }
};

usersModel.countUser = function (data, callback){
  console.log('USERS MODEL COUNT USER');
  console.log(data);
  if (mysql.connection) {
    console.log('IF MYSQL CONNECTION');
        mysql.connection.query('SELECT * FROM users WHERE email LIKE ?',[data.email],
        function(error, rows) {
            if(error){
              console.log('IF USERS MODEL');
                throw error;
            }else{
              console.log('ELSE USERS MODEL');
                callback(rows);
            }
        });
    }
};

module.exports = usersModel;
