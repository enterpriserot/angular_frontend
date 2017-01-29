
var mysql = require('../config.db');


var techniciansModel= {};

techniciansModel.getTechnicians = function (callback){
  if (mysql.connection) {
        console.log('techniciansModel');
        mysql.connection.query('SELECT * FROM technicians ORDER BY id', function(error, rows) {
            if(error){
                throw error;
            }else{
              console.log(rows);
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
