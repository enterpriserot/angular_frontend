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
        $scope.$watch('vm.filtro', vm.update);

        vm.map = {
          center: { latitude: 0, longitude: 0 },
          zoom: 13,
          windows: {
            model: {},
            show: false,
            options:{
              pixelOffset: {width:-1,height:-20}
            }
          },
          markersEvents: {
            click: function(marker, eventName, model, args) {
              // console.log(marker);
              // console.log(model);
              vm.map.windows.model = model;
              vm.map.windows.show = true;
              for (var i = 0; i < vm.technicians.length; i++) {
                if (vm.technicians[i].id === model.id) {
                  vm.infoWindow = vm.technicians[i];
                }
              }

            }
          }
        };
        // vm.getTechnicians = getTechnicians;


        // var watcher = vm.watch('./technicians.html');
        // watcher.on('change', update);

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
            var id = technicians[i]['id'];

            var marker = {
              latitude: latitude,
              longitude: longitude,
              id: id,
              icon: './images/man_icon.svg'
            };

            vm.markers.push(marker);
          }
        }

        function getLocation (){
          return dataservice.getLocation().then(function(data){
            console.log(data);
            var latitude = data.coords.latitude;
            var longitude = data.coords.longitude;

            vm.map.center = { latitude:latitude, longitude:longitude};

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
