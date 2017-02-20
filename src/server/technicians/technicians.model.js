var mysql = require('../config/config.db');

var techniciansModel= {};

techniciansModel.getTechnicians = function (location, callback){
  if (mysql.connection) {
    var distance = 0.09009009; /*Equivale a 10 Km, 1 = 111 Km*/
    var lat = location.latitude;
    var minLat = lat-distance;
    var maxLat = lat+distance;

    var lng = location.longitude;
    var minLng = lng-distance;
    var maxLng = lng+distance;

    mysql.connection.query(
      'SELECT * FROM technicians WHERE ((latitude >= "'+minLat+'" AND latitude <= "'+maxLat+'")'+
      ' AND (longitude >= "'+minLng+'" AND longitude <= "'+maxLng+'")) ORDER BY id',
      function(error, rows) {
        if(error){
            throw error;
        }else{
            callback(null, rows);
        }
    });
    }
};

// console.log(techniciansModel);
module.exports = techniciansModel;
