(function() {
  'use strict';

  angular
  .module('app.login')
  .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'loginpage',
        config: {
          url: '/loginpage',
          templateUrl: 'app/login/login.page.html',
          controller: 'LoginPageController',
          controllerAs: 'vm',
          title: 'login',
          params: {
            // param: value
          }
        }
      },
      {
        state: 'sociallogin',
        config: {
          url: '/sociallogin',
          controller: 'SocialController'/*,
          controllerAs: 'vm'*/
        }
      }
    ];
  }
})();
