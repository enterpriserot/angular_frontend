(function() {
    'use strict';

    angular
        .module('app.loginfb')
        .controller('LoginFacebookController', LoginFacebookController);

    LoginFacebookController.$inject = ['dataservice','$http', '$state', 'routerHelper',
    '$timeout', 'logger', '$rootScope'];

    /* @ngInject */
    function LoginFacebookController(dataservice, $http, $state, routerHelper, $timeout, logger,
      $rootScope) {
        var vm = this;

        // $http({
        //     url: '/api/facebook',
        //     method: 'GET',
        //     })
        //     .then(function(response){
        //       if(response.data === 'errorcredentials'){
        //           logger.error('Facebook login error!');
        //       }
        //     });

        activate();

        function activate() {
              console.log('LOGIN FACEBOOK CLIENT');
        }
    }
})();
