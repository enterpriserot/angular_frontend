(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$rootScope', '$q', '$state', 'routerHelper','$uibModal', 'dataservice', 'logger'];
  /* @ngInject */
  function MenuController($rootScope, $q, $state, routerHelper,$uibModal, dataservice, logger) {
    var vm = this;
    vm.animationsEnabled = true;

    vm.modalLogin = modalLogin;
    // vm.facebook = facebook;
    vm.logout = logout;

    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;

    activate();

    function activate() {
      getNavRoutes();

      var promises = [getAuthUser()];
      return $q.all(promises).then(function(){
          logger.info('Activated layout view');
      });
    }

    // function facebook(){
    //   console.log('loginFacebook');
    //   return dataservice.loginFacebook().then(function(data) {
    //     console.log('getAuthUser:');
    //     console.log(data);
    //     $rootScope.authUser = data;
    //     return $rootScope.authUser;
    //   });
    // }

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

        templateUrl: './app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        // resolve: {
        //   items: function () {
        //     return vm.items;
        //   }
        // }
      });
    }

    function getAuthUser(){
      return dataservice.isLoggedin().then(function(data) {
        console.log('getAuthUser:');
        console.log(data);
        console.log(data.email);
        console.log(data.userName.givenName);
        if(data.userName.givenName){
            $rootScope.authUser.name=data.userName.givenName;
        }

        $rootScope.authUser = data;
        return $rootScope.authUser;
      });
    }

    function logout(){
      console.log('logout');
      return dataservice.logout().then(function(data) {
        $rootScope.authUser = undefined;
        return $rootScope.authUser;
      });
    }

  }
})();
