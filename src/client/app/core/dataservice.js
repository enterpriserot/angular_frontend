(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$window', '$http', '$q', 'exception', 'logger', '$state', '$rootScope'];
  /* @ngInject */
  function dataservice($window, $http, $q, exception, logger, $state, $rootScope) {
    var service = {
      sendEmail: sendEmail,
      getTechnicians: getTechnicians,
      getLocation: getLocation,
      signup: signup,
      login: localLogin,
      checkLoggedin: checkLoggedin,
      isLoggedin: isLoggedin,
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

      function localLoginFb(data) {
              console.log('dataservice:');
              console.log(data);
              return $http.get('/api/loginfb', data)
                      .then(success)
                      .catch(fail);

              function success(response) {
                  console.log('true Facebook Login');
                  return response;
              }

              function fail() {
                console.log('false Facebook Login');
                  return false;
              }
        }//End localLoginFb function
        
        //================================================
        // Check if the user is connected
        //================================================
        function checkLoggedin(){

          return $http.get('/api/loggedin')
            .then(success)
            .catch(fail);

          function success(responseUser) {
             if (responseUser.data === '0'){
                 $rootScope.authUser = false;
                 $state.go('login');
            }else{
                $rootScope.authUser = responseUser.data;
            }
          }

          function fail(e) {
            return exception.catcher('XHR Failed for /api/loggedin')(e);
          }
        }

        function isLoggedin(){
          return $http.get('/api/loggedin')
            .then(success)
            .catch(fail);

          function success(responseUser) {
             if (responseUser.data === '0'){
                  $rootScope.authUser = false;
                 return false;
            }else{
              $rootScope.authUser = responseUser.data;
              return responseUser.data;
            }
          }

          function fail(e) {
            return exception.catcher('XHR Failed for /api/loggedin')(e);
          }
        }

        function logout(){
          return $http({
                url: '/api/logout',
                method: 'POST'
            })
            .then(function(responseUser) {
                console.log('OKKK:'+responseUser);
                 $rootScope.authUser =false;
                $state.go('/');

           },
           function(responseError) { // optional
               console.log('ERRRRROR: '+responseError);
               //$state.go('login');
           });
        }
  }
})();
