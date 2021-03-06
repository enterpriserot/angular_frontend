(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('dataservice', dataservice);

  dataservice.$inject = ['$window', '$http', '$q', 'exception', 'logger',
  '$state', '$rootScope'];
  /* @ngInject */
  function dataservice($window, $http, $q, exception, logger, $state, $rootScope) {

    var service = {
      sendEmail: sendEmail,
      getTechnicians: getTechnicians,
      signup: signup,
      checkLoggedin: checkLoggedin,
      isLoggedin: isLoggedin,
      login: login,
      logout: logout
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
      var location = {latitude:position.lat(), longitude:position.lng()};
      return $http.post('/api/technicians', location).then(success).catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getTechnicians')(e);
      }
    }

    // function getLocation() {
    //   var deferred =  $q.defer();
    //   if (!$window.navigator.geolocation) {
    //     deferred.rejected('Geolocation not suported');
    //   } else {
    //     $window.navigator.geolocation.getCurrentPosition(
    //       function (position) {
    //         deferred.resolve(position);
    //       },
    //
    //       function (err) {
    //         deferred.rejected(err);
    //       }
    //     );
    //   }
    //   return deferred.promise;
    // }

    function signup(data) {
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
    //================================================
    // Check if the user is connected
    //================================================
    function checkLoggedin() {

      return $http.get('/api/loggedin')
      .then(success)
      .catch(fail);

      function success(responseUser) {
        console.log('success:');
        console.log(responseUser);
        if (responseUser.data === '0') {
          $rootScope.authUser = false;
          $state.go('loginpage');
          //  $state.go('login');
        }else {
          console.log('else:');
          console.log(responseUser.data);
          $rootScope.authUser = responseUser.data;
        }
      }

      function fail(e) {
        console.log('fail:');
        console.log(e);
        return exception.catcher('XHR Failed for /api/loggedin')(e);
      }
    }

    function isLoggedin() {
      return $http.get('/api/loggedin')
      .then(success)
      .catch(fail);

      function success(responseUser) {
        if (responseUser.data === '0') {
          $rootScope.authUser = false;
          return false;
        }else {
          $rootScope.authUser = responseUser.data;
          return responseUser.data;
        }
      }

      function fail(e) {
        return exception.catcher('XHR Failed for /api/loggedin')(e);
      }
    }

    function login(data) {
      return $http.post('/api/login', data)
      .then(success)
      .catch(fail);

      function success(response) {
        console.log(response);
        console.log('true signup');
        return response;
      }

      function fail() {
        console.log('false signup');
        return false;
      }
    }

    function logout() {
      return $http({
        url: '/api/logout',
        method: 'POST'
      })
      .then(function(responseUser) {
        console.log('OKKK:');
        console.log(responseUser);
        $rootScope.authUser = false;
        $state.go('main');

      },
      function(responseError) { // optional
        console.log('ERRRRROR: ' + responseError);
        console.log(responseError);
        //$state.go('login');
      });
    }
  }
})();
