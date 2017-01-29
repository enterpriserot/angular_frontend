(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      sendEmail: sendEmail,
      getTechnicians: getTechnicians
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

    function getTechnicians() {
      return $http.get('/api/technicians').then(success).catch(fail);

      function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getTechnicians')(e);
        }
    }
  }
})();
