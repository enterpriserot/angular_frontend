(function() {
    // 'use strict';

    angular
        .module('app.technicians')
        .controller('techniciansController', techniciansController);

    techniciansController.$inject = ['$translatePartialLoader', '$q','dataservice','logger','$scope', '$uibModal'];

    /* @ngInject */
    function techniciansController($translatePartialLoader, $q, dataservice, logger, $scope, $uibModal) {
        var vm = this;
        vm.title = 'Technicians';
        vm.technicians= [];
        vm.filteredTechnicians = [];
        vm.markers = [];
        vm.maxSize = 5;
        vm.currentPage = 1;
        vm.itemsPerPage = 4;
        vm.filtro = '';
        vm.modalDetails = modalDetails;
        $scope.viewOnMap = viewOnMap;

        $translatePartialLoader.addPart('technicians');

        vm.pageChanged = function() {
          update();
        };

        vm.map = {
          center: { latitude: 0, longitude: 0 },
          zoom: 13,
          windows: {
            model: {},
            show: false,
            options:{
              pixelOffset: {width:10,height:10},
              position: {}
            }
          },
          markersEvents: {
            click: function(marker, eventName, model, args) {
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

        activate();

        function activate() {
          var promises = [getLocation()];
          return $q.all(promises).then(function(){
            logger.info('Activated Technicians View');
          });
        }

        function getTechnicians(location){
          return dataservice.getTechnicians(location).then(function (data) {
            vm.technicians = data;
            update();
            vm.getMarkers = getMarkers(vm.technicians);
            return vm.technicians;
          });
        }

        function update(){
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage), end = begin + vm.itemsPerPage;
            vm.filteredTechnicians = vm.technicians.slice(begin, end);
        }

        function modalDetails(technicianId) {
          console.log(technicianId);
          vm.technicianDetails = getDetails(technicianId);

          vm.modalInstance = $uibModal.open({
              animation: 'true',
              scope: $scope,
              size: 'md',
              templateUrl: 'app/technicians/technicianModal.html',
          });

        }

        function getDetails(technicianId) {
          for (var i = 0; i < vm.technicians.length; i++) {
            if (vm.technicians[i].id === technicianId) {
              return vm.technicians[i];
            }
          }
        }

        function viewOnMap(){
          vm.map.center = {
            latitude: vm.technicianDetails.latitude,
            longitude: vm.technicianDetails.longitude
          };
          vm.map.zoom = 16;
          vm.modalInstance.dismiss('cancel');
          // return vm.map;
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
            var latitude = data.coords.latitude;
            var longitude = data.coords.longitude;

            vm.map.center = { latitude:latitude, longitude:longitude };

            getTechnicians(data);
          });
      }

    }
})();
