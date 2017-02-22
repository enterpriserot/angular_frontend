(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'Repair on time',
      description: 'Application to search computer technicians near to you.'
    };

    vm.title = 'Main';



    activate();

    function activate() {

    }

  }
})();
