(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$state', 'routerHelper', '$uibModalInstance'];

    /* @ngInject */
    function UsersController($state, routerHelper, $uibModalInstance) {
        var vm = this;
        vm.title = 'Login';
        vm.closeModal = closeModal;
        vm.inputEmail = '';
        vm.inputPassword = '';
        vm.loginSend = loginSend;

        function closeModal(){
          console.log('CERRAR');
          $uibModalInstance.dismiss('cancel');
        }

        function loginSend(){
          console.log('loginSend');
          console.log(vm.inputEmail);
          console.log(vm.inputPassword);
        }

        // $scope.close = function () {
        // $uibModalInstance.dismiss('cancel');
        // };

        activate();

        function activate() {
            console.log('Inside activate');
        }
    }
})();
