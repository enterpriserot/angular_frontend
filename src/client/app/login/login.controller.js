(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice','$http', '$state', 'routerHelper', '$uibModalInstance',
    '$timeout', 'logger', '$rootScope', '$location'/*, 'cookiesService'*/];

    /* @ngInject */
    function LoginController(dataservice, $http, $state, routerHelper, $uibModalInstance, $timeout, logger,
      $rootScope, $location/*, cookiesService*/) {
        var vm = this;
        vm.title = 'Login';
        vm.closeModal = closeModal;
        vm.inputEmail = '';
        vm.inputPassword = '';
        vm.loginSend = loginSend;
        vm.goToSignup = goToSignup;


        function closeModal(){
          $uibModalInstance.dismiss('cancel');
        }

        function loginSend(){

          $http({
              url: '/api/login',
              method: 'POST',
              data: { 'email' :vm.inputEmail, 'password':vm.inputPassword }
              })
              .then(function(response) {
                if(response.data === 'errorcredentials'){
                    logger.error('e-mail / password incorrect');
                    vm.error = 'e-mail / password incorrect';
                  $timeout(function () {
                      vm.error = '';
                  }, 4000);
                }else if (response.data.email === vm.inputEmail) {
                    logger.success('User logged in correctly');
                    console.log(response.data.name);
                    $rootScope.authUser = response.data;

                    $timeout(function (){
                        $uibModalInstance.dismiss('cancel');
                        $state.go('admin');
                    },2000);
                }else{
                    logger.error('Intenal server error, try it later');
                }
                  // logger.success('User logged in correctly');
                  // console.log('OKKK:'+responseUser);
                  // console.log(responseUser);


             },
             function(responseError) { // optional
                 vm.error = 'Authentication failed.';
                 console.log('ERRRRROR: '+responseError);
                 $state.go('login');
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
            // console.log('Inside activate');
        }
    }
})();
