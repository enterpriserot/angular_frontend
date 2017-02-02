
<<<<<<< HEAD
var mysql = require('../config/config.db');
=======
var mysql = require('../config.db');
// var utils = require('../utils/functions.js');
>>>>>>> daurgil_branch


var techniciansModel= {};

techniciansModel.getTechnicians = function (location, callback){
  if (mysql.connection) {
    console.log(location);
    var distance = 0.09009; /*Equivale a 10 Km, 1 = 111 Km*/
    var lat = location.latitude;
    var minLat = lat-distance;
    var maxLat = lat+distance;

    var lng = location.longitude;
    var minLng = lng-distance;
    var maxLng = lng+distance;

    // select * from technicians
    // WHERE (latitude >= '38.7319693' AND latitude <= '38.9121493') AND (longitude >= '-0.6964827' AND longitude <= '-0.5163027') ORDER BY id
    console.log('SELECT * FROM technicians WHERE ((latitude >= "'+minLat+'" AND latitude <= "'+maxLat+'") AND (longitude >= "'+minLng+'" AND longitude <= "'+maxLng+'")) ORDER BY id');
    // var box = utils.getboundaries(lat, lng, distance);

        mysql.connection.query('SELECT * FROM technicians WHERE ((latitude >= "'+minLat+'" AND latitude <= "'+maxLat+'") AND (longitude >= "'+minLng+'" AND longitude <= "'+maxLng+'")) ORDER BY id', function(error, rows) {
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
