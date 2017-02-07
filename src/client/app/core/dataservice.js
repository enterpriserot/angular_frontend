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
      getLocation: getLocation,
      signup: signup,
      login: localLogin
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
      console.log(position);
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

    function signup(data){
        return $http.post('/api/signup', data)
                    .then(success)
                    .catch(fail);
                    
        function success(response) {
            console.log('true signup');
            return response;
        }

        function fail() {
          console.log('false signup');
            return false;
        }
    }//End signup function

    function localLogin(data) {
            console.log('dataservice:');
            console.log(data);
            return $http.post('/api/login', data)
                    .then(success)
                    .catch(fail);

            function success(response) {
                console.log('true main Login');
                return response;
            }

            function fail() {
              console.log('false main Login');
                return false;
            }
      }//End login function

  }
})();
