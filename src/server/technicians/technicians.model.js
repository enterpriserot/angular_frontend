
var mysql = require('../config/config.db');


var techniciansModel= {};

techniciansModel.getTechnicians = function (callback){
  if (mysql.connection) {
        mysql.connection.query('SELECT * FROM technicians ORDER BY id', function(error, rows) {
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

// techniciansModel.getTechnician = function(id,callback){
//     if (connection) {
//         var sql = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
//         connection.query(sql, function(error, row) {
//             if(error){
//                 throw error;
//             }else{
//                 callback(null, row);
//             }
//         });
//     }
// };
// console.log(techniciansModel);
module.exports = techniciansModel;
