(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$state', 'routerHelper','$uibModal'];
  /* @ngInject */
  function MenuController($state, routerHelper,$uibModal) {
    var vm = this;
    vm.animationsEnabled = true;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.modalLogin = modalLogin;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }

    function modalLogin(){

      var modalInstance = $uibModal.open({
        
        templateUrl: './app/users/login.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        // resolve: {
        //   items: function () {
        //     return vm.items;
        //   }
        // }
      });

    }


  }
})();
