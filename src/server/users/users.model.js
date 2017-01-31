'use strict';

var mysql = require('../config.db');
var passwordHelper = require('../helpers/password');
var _ = require('lodash');

var usersModel= {};

usersModel.getuser = function (callback){
  if (mysql.connection) {
        mysql.connection.query('SELECT * FROM users WHERE email like', function(error, rows) {
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

module.exports = usersModel;
