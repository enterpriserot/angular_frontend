(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['dataservice', '$state', '$timeout'];
  /* @ngInject */
  function ContactController(dataservice, $state, $timeout) {
    var vm = this;

    vm.title = 'Contact';
    vm.inputName = '';
    vm.inputEmail = '';
    vm.inputSubject = '';
    vm.inputMessage = '';
    vm.SubmitContact = SubmitContact;

    function SubmitContact() {
      var data = {
              name: vm.inputName,
              from: vm.inputEmail,
              to: 'enterpriserot@gmail.com',
              subject: vm.inputSubject,
              text: vm.inputMessage,
              type: 'admin'
      };
      dataservice.sendEmail(data).then(function (response) {

        if (response) {
            data.type = 'user';
            console.log(data);
            dataservice.sendEmail(data).then(function (response) {

                        if (response) {
                            vm.resultMessageOk = 'Email sent correctly!';
                            $timeout(function () {
                                vm.resultMessageOk = '';
                                $state.go('dashboard');
                            }, 3000);
                        } else {
                            vm.resultMessageFail =
                                    'Problem sending your email, please try again later!';
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);
                        }
                    });
        } else {
          vm.resultMessage =
            'Problem sending your email, please try again later!';
            $timeout(function () {
                        vm.resultMessageFail = '';
                    }, 3000);
        }
      });
    }
  }
})();
