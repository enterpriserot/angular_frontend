(function() {
    'use strict';

    angular
        .module('app.loginfb')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'loginfb',
                config: {
                    url: '/loginfb',
                    // templateUrl: 'app/state/state.html',
                    controller: 'LoginFacebookController',
                    controllerAs: 'vm',
                    // title: 'loginFb',
                    params: {
                        // param: value
                    }
                }
            }
        ];
    }
})();
