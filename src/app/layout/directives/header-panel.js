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
							//if (response.data.data != null && response.data.data != undefined && response.data.data != 'undefined')
							 {
								$scope.merchantName = response.data.data.name;
								console.log($rootScope.name);
								sessionStorage.setItem('merchantProfile', JSON.stringify(response.data.data));
								$scope.profile = response.data;
							}
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
							LoadMerchantProfile();
						}
						console.log($scope.merchantName);

					}

					$scope.Logout = function() {
						AuthenticationService.Logout();
					}
					_initilize();
					$scope.disable = true;
				}
			]
		};
	}
	module.directive('headerPanel', directive);

})();