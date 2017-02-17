(function() {
  'use strict';

  angular
    .module('app.contact')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'contact',
        config: {
          url: '/contact',
          templateUrl: 'app/contact/contact.view.html',
          controller: 'ContactController',
          controllerAs: 'vm',
          title: 'contact',
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Contact'
          }
        }
      }
    ];
  }
})();
