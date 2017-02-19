(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['$translatePartialLoader','$q', 'dataservice', 'logger'];
  /* @ngInject */
  function MainController($translatePartialLoader, $q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'Repair on time',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    $translatePartialLoader.addPart('main');
    vm.title = 'Main';

    activate();

    function activate() {

    }

  }
})();
