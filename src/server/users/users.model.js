'use strict';

var mysql = require('../config/config.db');

var usersModel = {};

module.exports = usersModel;

usersModel.insertUser = function(userData,callback) {

  if (mysql.connection) {
    mysql.connection.query('INSERT INTO users SET ?', [userData], function(err, result) {
      if (err) {
        throw err;
      }else {
        callback(result);
      }
    });
  }
};

usersModel.countUser = function (email,callback) {

  if (mysql.connection) {
    mysql.connection.query('SELECT COUNT(*) AS count FROM users WHERE email LIKE ?', [email],
    function(error, rows) {
      if (error) {
        throw error;
      }else {
        callback(rows);
      }
    });
  }
};

usersModel.getUser = function (email, callback) {

  if (mysql.connection) {
    mysql.connection.query('SELECT * FROM users WHERE email LIKE ?', [email],
    function (error, rows) {
      if (error) {
        console.log('error');
        throw error;
      }else {
        callback(null,rows);
      }
    });
  }
};

usersModel.signupUser = function (data, callback) {

  if (mysql.connection) {
    mysql.connection.query('SELECT COUNT(*) FROM users WHERE email LIKE ?', [data.email],
    function(error, rows) {
      if (error) {
        throw error;
      }else {
        if (rows[0]['COUNT(*)'] >= 1) {
          callback(rows);
        }else {

          if (mysql.connection) {
            mysql.connection.query('INSERT INTO users SET ?', [data], function(err, result) {
              if (err) {
                throw err;
              }else {
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
