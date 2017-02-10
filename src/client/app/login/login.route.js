(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/loginpage',
                    templateUrl: 'app/users/login.page.html',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'login',
                    params: {
                        // param: value
                    }
                }
            }
            // {
            //     state: 'profile',
            //     config: {
            //         url: '/profile',
            //         templateUrl: 'app/users/profile.html',
            //         controller: 'UsersController',
            //         controllerAs: 'vm',
            //         title: 'profile',
            //         params: {
            //             // param: value
            //         }
            //     }
            // }
        ];
    }
})();
