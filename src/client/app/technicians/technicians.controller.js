(function() {
    'use strict';

    angular
        .module('app.technicians')
        .controller('techniciansController', techniciansController);

    techniciansController.$inject = ['$q','dataservice','logger'];

    /* @ngInject */
    function techniciansController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Technicians';
        vm.technicians= [];

        vm.map = { center: { latitude: 38.8101561, longitude: -0.6043774 }, zoom: 10 };

        activate();

        function activate() {
          var promises = [getTechnicians()];
          console.log(promises);
          return $q.all(promises).then(function(){
            logger.info('Activated Technicians View');
          });
        }

        function getTechnicians(){
          return dataservice.getTechnicians().then(function (data) {
            vm.technicians = data;
            return vm.technicians;
          });
        }
    }
})();
