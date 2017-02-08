(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$window', '$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($window, $http, $q, exception, logger) {
    var service = {
      sendEmail: sendEmail,
      getTechnicians: getTechnicians,
      getLocation: getLocation
    };

    return service;

    function sendEmail(data) {

      return $http.post('/api/sendmail', data)
        .then(success)
        .catch(fail);

      function success() {
        return true;
      }

      function fail() {
        return false;
      }
    }

    function getTechnicians(position) {
      var location = {latitude:position.coords.latitude, longitude:position.coords.longitude};
      return $http.post('/api/technicians', location).then(success).catch(fail);

      function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getTechnicians')(e);
        }
    }

    function getLocation() {
      var deferred =  $q.defer();
      if (!$window.navigator.geolocation) {
        deferred.rejected('Geolocation not suported');
      } else {
        $window.navigator.geolocation.getCurrentPosition(
          function (position) {
            deferred.resolve(position);
          },

          function (err) {
            deferred.rejected(err);
          }
        );
      }
      return deferred.promise;
    }
  }
})();
