(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['dataservice', '$state', 'routerHelper', '$uibModalInstance', '$timeout', 'logger'];

    /* @ngInject */
    function UsersController(dataservice, $state, routerHelper, $uibModalInstance, $timeout, logger) {
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
            'pass': vm.inputPassword
          };

          var userData = JSON.stringify(data);

          dataservice.login(userData).then(function (response){
              console.log(response);
              if(response.data === 'errorcredentials'){
                logger.error('e-mail/password incorrect');
                vm.error = 'e-mail/password incorrect';
                $timeout(function () {
                    vm.error = '';
                }, 4000);
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
