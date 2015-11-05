(function() {
	"use strict";
	// Initialize module
	var module = angular.module('Starter', []);

	function controller($scope, $http) {

		var model = {
			"AccountName": "Spectrum-Health\\sha18306",
			"FirstName": "Neil",
			"LastName": "Shaffer",
			"MiddleInitial": "E",
			"DisplayName": "Shaffer, Neil E.",
			"PictureUrl": "https://insite.spectrum-health.org:443/ia/Picture/sha18306/",
			"Manager": "Spectrum-Health\\bre79053",
			"WorkEmail": "Neil.Shaffer@spectrumhealth.org"
		};

		$scope.user = model;


		
			 $http.get("modules/Starter/data/user.json")
				.success(function(data) {
					$scope.user2 = data;
					console.log("Success... User2 = " + JSON.stringify(data));
				})
				.error(function(data, status, headers, config) {
					console.log(status + " Data: " + data);
				});
			
	}
	// Register the controller
	module.controller('StarterCtrl', ['$scope', '$http', controller]);
})();