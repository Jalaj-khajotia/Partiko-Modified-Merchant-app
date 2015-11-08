(function() {

	'use strict';
	var module = angular.module('directives');

	function directive() {
		return {
			templateUrl: 'app/layout/views/header-panel.html',
			restrict: 'E',
			replace: true,
			controller: ['AuthenticationService', '$scope', '$rootScope',
			 function(AuthenticationService, $scope, $rootScope) {
				function LoadMerchantProfile() {
					AuthenticationService.GetProfile().then(function(response) {
						$scope.merchantName = response.data.data.name;
						console.log($rootScope.name);
						sessionStorage.setItem('merchantProfile', JSON.stringify(response.data.data));
						$scope.profile = response.data;
					}, function() {

					})
				}

				function _initilize() {
					var isUserLoggedin = sessionStorage.getItem('LoggedIn');
					if (isUserLoggedin === "true") {
						var merchantProfile = sessionStorage.getItem('merchantProfile');
						$scope.merchantName = JSON.parse(merchantProfile).name;
					} else {
						sessionStorage.setItem('LoggedIn', 'true');
						//LoadMerchantProfile();
					}
					console.log($scope.merchantName);
					
				}
				//_initilize();
				$scope.disable = true;
			}]
		};
	}
	module.directive('headerPanel', directive);

})();