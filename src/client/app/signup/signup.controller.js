(function() {
  'use strict';

  angular
  .module('app.signup')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['$translatePartialLoader', 'dataservice', '$state',
  'routerHelper', '$timeout'];

  /* @ngInject */
  function SignupController($translatePartialLoader, dataservice, $state, routerHelper, $timeout) {
    var vm = this;

    vm.signupName = '';
    vm.signupEmail = '';
    vm.signupPass = '';
    vm.signupPass2 = '';
    vm.sendSignup = sendSignup;
    vm.user = {};

    $translatePartialLoader.addPart('signup');

    function sendSignup() {
      console.log('sendSignup');
      if (vm.signupPass2 === vm.signupPass) {
        vm.user = {
          'name': vm.signupName,
          'email': vm.signupEmail,
          'password': vm.signupPass
        };

        var UserJSON = JSON.stringify(vm.user);
        dataservice.signup(UserJSON).then(function (response) {
          console.log(response);
          if (response.data === 'name') {
            vm.errorMail = 'email is in use in our database';
            $timeout(function () {
              vm.errorMail = '';
            }, 6000);
          }else if (response.data === 'err') {
            vm.resultmessage = 'Server error, please try it later';
            $timeout(function () {
              vm.resultmessage = '';
              $state.go('main');
            }, 6000);
          }else {
            vm.resultmessage = 'User created successfull';
            $timeout(function () {
              vm.resultmessage = '';
              $state.go('main');
            }, 6000);
          }
        });
      }else {
        console.log('els passwords són diferents');
        vm.message = 'Passwords does not match';
        $timeout(function () {
          vm.message = '';
        }, 6000);
      }
    }

    activate();

    function activate() {
      console.log('signup activate');
    }
  }
})();
