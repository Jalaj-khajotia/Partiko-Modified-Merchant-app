(function() {

	"use strict";

	// Declare app level module which depends on filters, and services
	var app = angular.module('StarterApp', ['ngRoute', 'login', 'Starter', 'services','directives','event','dashboard']);
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/Starter', {
				templateUrl: 'app/Starter/views/starter.html',
				controller: 'StarterCtrl'
			})
			.when('/login', {
				templateUrl: 'app/login/views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/dashboard', {
				templateUrl: 'app/dashboard/views/dashboard.html',
				controller: 'dashCtrl'
			})
			.when('/add-event', {
				templateUrl: 'app/event/views/add-event.html',
				controller: 'add-eventCtrl'
			})
			.when('/e', {
				templateUrl: 'app/event/views/event-detail.html',
				controller: 'event-detailCtrl'
			})
			.when('/events', {
				templateUrl: 'app/event/views/display-events.html',
				controller: 'display-eventCtrl'
			})
			.when('/searchResult', {
				templateUrl: 'app/event/views/display-events.html',
				controller: 'display-eventCtrl'
			})
			.when('/edit-event', {
				templateUrl: 'app/event/views/add-event.html',
				controller: 'edit-eventCtrl'
			})
			.when('/404-error', {
				templateUrl: 'app/404-error/views/404.html',
				controller: ''
			});
		$routeProvider.otherwise({
			redirectTo: '/404-error'
		});
	}]);
})();