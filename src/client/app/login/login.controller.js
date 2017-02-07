(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', '$state', 'routerHelper', '$uibModalInstance', '$timeout', 'logger', '$rootScope'];

    /* @ngInject */
    function LoginController(dataservice, $state, routerHelper, $uibModalInstance, $timeout, logger, $rootScope) {
        var vm = this;
        vm.title = 'Login';
        vm.closeModal = closeModal;
        vm.inputEmail = '';
        vm.inputPassword = '';
        vm.loginSend = loginSend;
        vm.goToSignup = goToSignup;


        function closeModal(){
          console.log('CERRAR');
          $uibModalInstance.dismiss('cancel');
        }

        function loginSend(){
          var data = {
            'email': vm.inputEmail,
            'password': vm.inputPassword
          };

          var userData = JSON.stringify(data);

          dataservice.login(userData).then(function (response){
              console.log(response);
              if(response.data === 'errorcredentials'){
                  logger.error('e-mail / password incorrect');
                  vm.error = 'e-mail / password incorrect';
                $timeout(function () {
                    vm.error = '';
                }, 4000);
              }else if (response.data.email === vm.inputEmail) {
                  logger.success('User logged in correctly');
                  $timeout(function (){
                      $uibModalInstance.dismiss('cancel');
                      // $state.go('main');
                      $rootScope.authUser = response.data.email;
                      $state.go('admin');
                  },2000);
              }else{
                  logger.error('Intenal server error, try it later');
              }
          });
          console.log('loginSend');
          console.log(vm.inputEmail);
          console.log(vm.inputPassword);
        }//End loginSend

        // $scope.close = function () {
        // $uibModalInstance.dismiss('cancel');
        // };

        function goToSignup(){
          console.log('goToSignup');
          $uibModalInstance.dismiss('cancel');
          $state.go('signup');
        }



        activate();

        function activate() {
            console.log('Inside activate');
        }
    }
})();
