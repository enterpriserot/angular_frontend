(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$state', 'routerHelper'];

    /* @ngInject */
    function UsersController($state, routerHelper) {
        var vm = this;


        activate();

        function activate() {

        }
    }
})();
