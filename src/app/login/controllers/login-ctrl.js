(function() {

    'use strict';
    /**
     * @ngdoc function
     * @name sbAdminApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the sbAdminApp
     */
    var module = angular.module('login');

    function controller($scope, $window, $http, $rootScope, AuthenticationService) {

        $scope.Login = function(loginObj) {

            var username = loginObj.username;
            var pass = loginObj.password;
            AuthenticationService.Login(username, pass);            
        };

        $scope.Logout = function() {
            AuthenticationService.Logout();
        }
        $scope.Logout();
        $rootScope.hideMenu = true;       
    }
    module.controller('LoginCtrl', ['$scope', '$window', '$http','$rootScope', 'AuthenticationService', controller]);

})();