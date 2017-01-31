(function() {
    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/users/profile.html',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'profile',
                    params: {
                        // param: value
                    }
                }
            }
        ];
    }
})();
