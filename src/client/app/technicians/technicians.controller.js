(function() {
    'use strict';

    angular
        .module('app.technicians')
        .controller('techniciansController', techniciansController);

    techniciansController.$inject = ['$q','dataservice','logger','$scope'];

    /* @ngInject */
    function techniciansController($q, dataservice, logger, $scope) {
        var vm = this;
        vm.title = 'Technicians';
        vm.technicians= [];
        vm.filteredTechnicians = [];
        vm.numPerPage = 5;
        vm.maxSize = 5;
        vm.currentPage = 1;

        $scope.$watch(update);
        // var watcher = vm.watch('./technicians.html');
        // watcher.on('change', update);

        vm.map = { center: { latitude: 38.8101561, longitude: -0.6043774 }, zoom: 10 };

        activate();

        function activate() {
          var promises = [getTechnicians()];
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

        function update(){
            var begin = ((vm.currentPage - 1) * vm.numPerPage), end = begin + vm.numPerPage;
            vm.filteredTechnicians = vm.technicians.slice(begin, end);
        }
    }
})();
