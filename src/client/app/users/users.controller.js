(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['dataservice', '$state', 'routerHelper', '$uibModalInstance'];

    /* @ngInject */
    function UsersController(dataservice, $state, routerHelper, $uibModalInstance) {
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

          var UserJSON = JSON.stringify(data);
          // dataservice.getLocation(UserJSON).then(function (response){
          //   console.log(response);
          // });
          dataservice.login(UserJSON).then(function (response){
              console.log(response);
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
