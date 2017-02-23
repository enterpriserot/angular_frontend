(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['$translatePartialLoader','$q', 'dataservice', 'logger', 'NgMap'];
  /* @ngInject */
  function MainController($translatePartialLoader, $q, dataservice, logger, NgMap) {
    var vm = this;
    vm.news = {
      title: 'Repair on time',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    $translatePartialLoader.addPart('main');
    vm.title = 'Main';

    vm.placeChanged = function() {
      vm.place = this.getPlace();
      vm.location = vm.place.geometry.location;
      console.log(vm.location);
    };

    activate();

    function activate() {

    }

  }
})();
