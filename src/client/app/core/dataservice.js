(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getTechnicians: getTechnicians,
    };

    return service;

    function getTechnicians() {
      return $http.get('/api/technicians').then(success).catch(fail);

      function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for getTechnicians')(e);
        }
    }


    // function getMessageCount() { return $q.when(72); }
    //
    // function getPeople() {
    //   return $http.get('/api/people').then(success).catch(fail);
    //
    //   function success(response) {
    //     return response.data;
    //   }
    //
    //   function fail(e) {
    //     return exception.catcher('XHR Failed for getPeople')(e);
    //   }
    // }
  }
})();
