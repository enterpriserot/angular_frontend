(function() {
  'use strict';

  angular
  .module('app.login')
  .controller('LoginPageController', LoginPageController);

  LoginPageController.$inject = ['$translatePartialLoader', 'dataservice','$http', '$state',
  'routerHelper', '$timeout', 'logger', '$rootScope', '$location'];

  /* @ngInject */
  function LoginPageController($translatePartialLoader, dataservice, $http, $state, routerHelper,
    $timeout, logger, $rootScope, $location) {
    var vm = this;
    vm.title = 'Login';
    vm.inputEmail = '';
    vm.inputPassword = '';
    vm.loginSend = loginSend;
    vm.goToSignup = goToSignup;

    $translatePartialLoader.addPart('login');

    function loginSend() {

      var data = { 'email': vm.inputEmail,
                   'password': vm.inputPassword };

      dataservice.login(data)
      .then(function(response) {
        console.log(response);
        if (response.data === 'errorcredentials') {
          logger.error('e-mail / password incorrect');
          vm.error = 'e-mail / password incorrect';
          $timeout(function() {
            vm.error = '';
          }, 4000);
        }else if (response.data.email === vm.inputEmail) {
          logger.success('User logged in correctly');
          console.log(response.data.name);
          $rootScope.authUser = response.data;

          $timeout(function() {
            $state.go('admin');
          },2000);
        }else {
          logger.error('Intenal server error, try it later');
        }
      },
      function(responseError) { // optional
        vm.error = 'Authentication failed.';
        $state.go('login');
      });

    }//End loginSend

    function goToSignup() {
      console.log('goToSignup');
      $state.go('signup');
    }

    activate();

    function activate() {
      logger.info('Activated Login View');
    }
  }
})();
