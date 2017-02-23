(function() {
  'use strict';

  angular
  .module('app.technicians')
  .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'technicians',
        config: {
          url: '/technicians',
          templateUrl: 'app/technicians/technicians.html',
          controller: 'techniciansController',
          controllerAs: 'vm',
          title: 'TECHNICIANS',
          settings: {
            nav: 1,
            content: '<i class="fa fa-lock"></i> Technicians'
          }
        }
      }
    ];
  }
})();
