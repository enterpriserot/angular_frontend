(function() {
  // 'use strict';

  angular
  .module('app.technicians')
  .controller('techniciansController', techniciansController);

  techniciansController.$inject = ['$translatePartialLoader', '$q','dataservice','logger','$scope',
  '$uibModal', 'NgMap'];

  /* @ngInject */
  function techniciansController($translatePartialLoader, $q, dataservice, logger, $scope,
    $uibModal, NgMap) {
    var vm = this;
    vm.title = 'Technicians';
    vm.technicians = [];
    vm.filteredTechnicians = [];
    vm.markers = [];
    vm.maxSize = 5;
    vm.currentPage = 1;
    vm.itemsPerPage = 4;
    vm.filtro = '';
    vm.lat = 0;
    vm.lng = 0;
    vm.modalDetails = modalDetails;
    vm.showDetailMarker = showDetailMarker;
    $scope.viewOnMap = viewOnMap;

    $translatePartialLoader.addPart('technicians');

    vm.pageChanged = function() {
      update();
    };

    activate();

    function activate() {
      var promises = [getMarkersMap()];
      return $q.all(promises).then(function() {
        logger.info('Activated Technicians View');
      });
    }

    function getMarkersMap() {
      return NgMap.getMap().then(function(map) {
        vm.map = map;
        vm.map.setZoom(12);
        // vm.lat = vm.map.getCenter().lat();
        // console.log(vm.lat);
        // vm.lng = vm.map.getCenter().lng();
        // console.log(vm.lng);
        vm.coords = vm.map.getCenter();
        getTechnicians(vm.coords);

      });
    }

    function getTechnicians(location) {
      return dataservice.getTechnicians(location).then(function (data) {
        vm.technicians = data;
        update();
        vm.markers = vm.technicians;

        return vm.technicians;
      });
    }

    function update() {
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

    function showDetailMarker(e, marker) {
      vm.marker = marker;
      console.log(vm.marker);
      vm.map.showInfoWindow('foo-iw', marker.id);
    }

    function getDetails(technicianId) {
      for (var i = 0; i < vm.technicians.length; i++) {
        if (vm.technicians[i].id === technicianId) {
          return vm.technicians[i];
        }
      }
    }

    function viewOnMap() {
      vm.map.setCenter({lat: vm.technicianDetails.latitude, lng: vm.technicianDetails.longitude});

      vm.map.setZoom(15);
      vm.modalInstance.dismiss('cancel');
      // return vm.map;

    }

  }
})();
