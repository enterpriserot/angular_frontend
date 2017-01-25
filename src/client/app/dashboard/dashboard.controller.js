(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger','$sce'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger, $sce) {
    var vm = this;
    vm.news = {
      title: 'Repair on time',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };

    vm.title = 'Dashboard';

    vm.config = {
				sources: [
					// {src: $sce.trustAsResourceUrl('https://repairontime.tk/view/video/mp4/back.mp4'), type: 'video/mp4'},
          {src: $sce.trustAsResourceUrl('//static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'}/*,
					{src: $sce.trustAsResourceUrl('https://repairontime.tk/view/video/webm/back.webm'), type: 'video/webm'},
					{src: $sce.trustAsResourceUrl('https://repairontime.tk/view/video/ogv/back.ogv'), type: 'video/ogg'}*/
				],
        plugins: {
          poster: 'https://repairontime.tk/view/img/static.jpg'
        }
    };
    activate();

    function activate() {

    }

  }
})();
