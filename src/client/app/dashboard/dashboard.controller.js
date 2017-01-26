(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'Repair on time',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };

    vm.title = 'Main';

    vm.myVideo = {
    mp4: './video/back.mp4',
    ogg: './video/back.ogv',
    webm: './video/back.webm'
    };

    // vm.config = {
		// 		sources: [
		// 			{src: $sce.trustAsResourceUrl('./video/back.mp4'), type: 'video/mp4'},
		// 			{src: $sce.trustAsResourceUrl('./video/back.webm'), type: 'video/webm'},
		// 			{src: $sce.trustAsResourceUrl('./video/back.ogv'), type: 'video/ogg'}
		// 		],
    //     plugins: {
    //       poster: 'https://repairontime.tk/view/img/static.jpg'
    //     }
    // };
    activate();

    function activate() {

    }

  }
})();
