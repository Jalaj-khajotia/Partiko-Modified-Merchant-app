(function() {

	'use strict';
	var module = angular.module('event');

	function controller(EventsService, toastr, $scope, ngDialog, $rootScope) {

		$scope.closeDialog = function() {
			ngDialog.close('ngdialog1');
		}

		$scope.DeleteEvent = function() {
			ngDialog.close('ngdialog1');
			EventsService.DeleteEvent($rootScope.EventtobeDeleted.key).then(function(response) {
				toastr.success('Event deleted successfully', 'Success!');
				sessionStorage.removeItem('allEvents');
				var afterDeleteEvents = [];
				angular.forEach($rootScope.filteredEvents, function(currentEvent) {
					if (currentEvent.key !== $rootScope.EventtobeDeleted.key && currentEvent.key !== undefined && currentEvent.key !== null && currentEvent.key !== '') {
						afterDeleteEvents.push(currentEvent);
					}
				});
				$rootScope.filteredEvents = afterDeleteEvents;
			}, function() {
				toastr.success('Event deleting failed', 'Error!');
			});
		}
	}
	module.controller('DialogCtrl', ['EventsService', 'toastr', '$scope', 'ngDialog', '$rootScope', controller]);

})();