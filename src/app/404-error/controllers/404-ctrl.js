(function() {

	'use strict';
	var module = angular.module('404error');

	function controller($rootScope) {
		 $rootScope.hideMenu = true;
	}
	module.controller('404Ctrl', ['$rootScope', controller]);

})();