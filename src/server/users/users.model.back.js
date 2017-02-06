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

usersModel.countUser = function (data, callback){

  if (mysql.connection) {
    console.log('IF MYSQL CONNECTION');
        mysql.connection.query('SELECT COUNT(*) AS count FROM users WHERE email LIKE ?', [data],
        function(error, rows) {
            if(error){
              console.log('IF USERS MODEL');
                throw error;
            }else{
              console.log('ELSE USERS MODEL');
              console.log(rows[0]['COUNT(*)']);
              if(rows[0]['COUNT(*)'] >= 1){
                console.log('HA ENTRADO AL IF');
                rows='e-mail is in use in our database';
                callback(rows);
              }
                callback(rows);
            }
        });
    }
};

module.exports = usersModel;
