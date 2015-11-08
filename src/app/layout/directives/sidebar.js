(function() {

  'use strict';
  var module = angular.module('directives');

  function directive() {

    return {
      templateUrl: 'app/layout/views/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: function($scope, $window) {

        $scope.check = function(x) {
          console.log("hello");
          if (x == $scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };

        $scope.handle = function(keyEvent) {
          if (keyEvent.which === 13) {
             $scope.search();
          }
        }

        $scope.search = function(){
          $window.location.href = '/#/searchResult?search=' + $scope.keyword;
        }

        $scope.multiCheck = function(y) {

          if (y == $scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };

        function _initilize() {
          $scope.disable = true;
          $scope.selectedMenu = 'dashboard';
          $scope.collapseVar = 1;
          $scope.multiCollapseVar = 0;
        }
        _initilize();
      }
    }
  }
  module.directive('sidebar', [directive]);
})();