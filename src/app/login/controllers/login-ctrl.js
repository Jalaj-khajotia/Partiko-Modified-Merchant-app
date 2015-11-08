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

    function controller($scope, $window, $http, AuthenticationService) {

        $scope.Login = function(loginObj) {

            var username = loginObj.username;
            var pass = loginObj.password;
            AuthenticationService.Login(username, pass);
        };

        $scope.Logout = function() {
            AuthenticationService.Logout();
        }
        $scope.Logout();
        $scope.loginPage = true;
    }
    module.controller('LoginCtrl', ['$scope', '$window', '$http', 'AuthenticationService', controller]);

})();