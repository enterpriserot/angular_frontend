(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['dataservice'];
  /* @ngInject */
  function ContactController(dataservice) {
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
      };
      dataservice.sendEmail(data).then(function(response) {

        if (response) {
          vm.resultMessage = 'Su email ha sido enviado correctamente';
          vm.inputName = '';
          vm.inputEmail = '';
          vm.inputSubject = '';
          vm.inputMessage = '';
        } else {
          vm.resultMessage =
            'Ha habido un error al enviar el email, intentelo mas tarde';
        }
      });
    }
  }
})();
