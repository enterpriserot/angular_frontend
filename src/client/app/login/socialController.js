(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('SocialController', SocialController);

    SocialController.$inject = ['dataservice', '$http', '$state', 'routerHelper', 'logger',
    '$rootScope', '$location'];

    /* @ngInject */
    function SocialController(dataservice, $http, $state, routerHelper, logger,
    $rootScope, $location) {
        // var vm = this;

        activate();

        function activate() {
            $http({
                url: '/api/success',
                method: 'GET'
            })
            .then(function(response){
              console.log(response);
                  $rootScope.authUser = response.data;
                  logger.success('User logged in correctly');
                  $state.go('admin');
            })
            .catch(function(fail){
              return false;
            });
        }
    }
})();
