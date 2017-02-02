(function() {
    'use strict';

    angular
        .module('app.technicians')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'technicians',
                config: {
                    url: '/technicians',
                    templateUrl: 'app/technicians/technicians.html',
                    controller: 'techniciansController',
                    controllerAs: 'vm',
                    title: 'Technicians',
                    settings: {
                      nav: 4,
                      content: '<i class="fa fa-lock"></i> Technicians'
                    }
                }
            }
        ];
    }
})();
//
// (function() {
//     'use strict';
//
//     angular
//         .module('module')
//         .run(appRun);
//
//     appRun.$inject = ['routerHelper'];
//     /* @ngInject */
//     function appRun(routerHelper) {
//         routerHelper.configureStates(getStates());
//     }
//
//     function getStates() {
//         return [
//             {
//                 state: 'state',
//                 config: {
//                     url: '/',
//                     templateUrl: 'app/state/state.html',
//                     controller: 'StateController',
//                     controllerAs: 'vm',
//                     title: 'state',
//                     params: {
//                         param: value
//                     }
//                 }
//             }
//         ];
//     }
// })();
