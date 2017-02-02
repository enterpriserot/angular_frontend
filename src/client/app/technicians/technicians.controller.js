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
        vm.markers = [];
        vm.numPerPage = 5;
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.filtro = '';
        vm.update = update;
        // vm.getTechnicians = getTechnicians;

        $scope.$watch('vm.filtro', vm.update);
        // var watcher = vm.watch('./technicians.html');
        // watcher.on('change', update);

        vm.map = { center: { latitude: 0, longitude: 0 }, zoom: 10 };


        activate();

        function activate() {
          // vm.getLocation();
          var promises = [getLocation()];
          return $q.all(promises).then(function(){
            logger.info('Activated Technicians View');
          });
        }

        function getTechnicians(location){
          return dataservice.getTechnicians(location).then(function (data) {
            console.log('hola');
            vm.technicians = data;
            // console.log(vm.technicians);
            vm.getMarkers = getMarkers(vm.technicians);
            return vm.technicians;
          });
        }

        function update(newValue,oldValue){
            var begin = ((vm.currentPage - 1) * vm.numPerPage), end = begin + vm.numPerPage;
            vm.filteredTechnicians = vm.technicians.slice(begin, end);
        }

        function getMarkers(technicians) {

          for (var i = 0; i < technicians.length; i++) {
            var latitude = technicians[i]['latitude'];
            var longitude = technicians[i]['longitude'];

            var marker = {latitude: latitude, longitude: longitude, id: i, icon: './images/man_icon.svg'};

            vm.markers.push(marker);
          }
        }

        function getLocation (){
          return dataservice.getLocation().then(function(data){
            console.log(data);
            var latitude = data.coords.latitude;
            var longitude = data.coords.longitude;

            vm.map = {
              center:{latitude:latitude, longitude:longitude},
              zoom:12
            };
            getTechnicians(data);
          });
      }

    }
})();

// navigator.geolocation.getCurrentPosition(function(position) {
//   $scope.$apply(function(){
//     vm.map = {
//       center:{latitude:position.coords.latitude, longitude:position.coords.longitude},
//       zoom:12
//     };
//     console.log(vm.map);
//   });
//
// });
