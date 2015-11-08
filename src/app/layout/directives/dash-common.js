(function() {

  'use strict';
  var module = angular.module('directives',['services']);

  function directive() {

    return {
      templateUrl: 'app/layout/views/dash-common.html',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: function($scope, $window) {


        function _initilize() {}
        _initilize();
      }
    }
  }
  module.directive('dashCommon',[ directive]);
})();