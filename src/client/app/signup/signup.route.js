(function() {
  'use strict';

  angular
  .module('app.signup')
  .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'signup',
        config: {
          url: '/signup',
          templateUrl: 'app/signup/signup.html',
          controller: 'SignupController',
          controllerAs: 'vm',
          title: 'signup'
        }
      }
    ];
  }
})();
