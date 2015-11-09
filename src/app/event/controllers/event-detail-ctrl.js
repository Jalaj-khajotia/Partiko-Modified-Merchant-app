(function() {

	'use strict';
	var module = angular.module('event');

	function controller($scope, $window, $rootScope, AuthenticationService) {

		$scope.LoadEvent = function(event) {
				var event = sessionStorage.getItem('currentEvent');
				$scope.currentEvent = JSON.parse(event);

				var formattedTime = formatDate($scope.currentEvent.start_time + ':00');
				var splittedDate = formattedTime.split(' ');

				$scope.monthDate = splittedDate[0] + ' ' + splittedDate[1];
				$scope.year = splittedDate[2];
				var split = splittedDate[3].split(':');
				var hrs = split[0] + ':' + split[1];
				$scope.timeInAmPmFormat = hrs + ' ' + splittedDate[4];

				if ($scope.currentEvent.cover === "") {
					$scope.showFallBackImg = true;
				} else {
					$scope.showFallBackImg = false;
				}
			}
			// var latlng = new google.maps.LatLng(35.7042995, 139.7597564);
			/* var mapOptions = {
			        zoom: 14,
			        center: new google.maps.LatLng(35.7042995, 139.7597564),
			        mapTypeId: google.maps.MapTypeId.TERRAIN
			    }

			    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);*/

		function formatDate(date) {
			var d = new Date(date);
			var hh = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			var dd = "AM";
			var h = hh;
			if (h >= 12) {
				h = hh - 12;
				dd = "PM";
			}
			if (h == 0) {
				h = 12;
			}
			m = m < 10 ? "0" + m : m;

			s = s < 10 ? "0" + s : s;

			/* if you want 2 digit hours: */
			h = h < 10 ? "0" + h : h;

			var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
			return date.replace(pattern, h + ":" + m + ":" + s + " " + dd)
		}

		function _initilize(){
		$rootScope.hideMenu = true; 
		AuthenticationService.CheckForLoggedin();
		$scope.LoadEvent();
		document.body.scrollTop = 0;
		}

		_initilize();
	}
	module.controller('event-detailCtrl', ['$scope', '$window', '$rootScope','AuthenticationService', controller]);

})();