(function() {
  'use strict';

  var module = angular.module('services');

  function service($http, $window, $rootScope) {

    this.Login = function(username, password, callback) {
      sessionStorage.clear();
      var body = '{"email" :"' + username + '", "password" :"' + password + '" }';

      $http({
          method: 'POST',
          url: 'http://api.partiko.com/merchant/login',
          data: body
        })
        .then(function(response) {
          /*$scope.status = response.status;
          $scope.data = response.data;*/
          // console.log( response.status);
          if (response.data.status) {
            $window.location.href = "/#/dashboard";
            sessionStorage.setItem('token', response.data.token);
            //sessionStorage.setItem('token', 'eyJrZXkiOiIwYmFkZDZlNmIyNjA2MzI3In0.CPxCdA.DnlMGuZdsDzSRupCHe9KY17M9LE');
          } else {}
        }, function(response) {
          alert("Either password or username is wrong");
        });
    };

    this.GetProfile = function() {
      var authdata = sessionStorage.getItem('token');
      var encodedData = btoa(authdata + ":partiko");
      $http.defaults.headers.common['Content-Type'] = 'application/json';
      $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedData;

      return $http.get('http://web.partiko.com/merchant/profile')
        .then(function(response) {
          return response;
        }, function(error) {
          return error;
        });
    }

    this.CheckForLoggedin = function() {
      var authdata = sessionStorage.getItem('token');
      if (authdata === '' || authdata === null || authdata === 'undefined') {
        $rootScope.LoggedIn = false;
        $window.location.href = "/#/login";
        return $rootScope.LoggedIn;
      } else {
        var encodedData = btoa(authdata + ":partiko");
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedData;

        $http.get('http://web.partiko.com/merchant/profile')
          .then(function(response) {
            $rootScope.LoggedIn = true;
            return $rootScope.LoggedIn;
          }, function(error) {
            $rootScope.LoggedIn = false;
            $window.location.href = "/#/login";
            return $rootScope.LoggedIn;
          });
      }
    }

    this.Logout = function() {
      sessionStorage.clear();
      $window.location.href = "/#/login";
    };
  }
  module.service('AuthenticationService', ['$http', '$window', '$rootScope', service]);

})();