(function() {

	"use strict";

	// Declare app level module which depends on filters, and services
	var app = angular.module('StarterApp', ['ngRoute', 'login', 'Starter', 'services']);
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/Starter', {
				templateUrl: 'app/Starter/views/starter.html',
				controller: 'StarterCtrl'
			})
			.when('/login', {
				templateUrl: 'app/login/views/login.html',
				controller: 'LoginCtrl'
			});
		//$routeProvider.when('/call/:CallId', {templateUrl: 'calls/views/call.html', controller: 'CallsCtrl'});
		//$routeProvider.when('/addTask', {templateUrl: 'partials/addTask.html', controller: 'CallsCtrl'});
		//$routeProvider.when('/editCall', {templateUrl: 'partials/editCall.html', controller: 'CallsCtrl'});
		//$routeProvider.when('/addNote', {templateUrl: 'partials/addNote.html', controller: 'CallsCtrl'});
		//$routeProvider.when('/login', {templateUrl: 'login/views/login.html', controller: 'LoginCtrl'});
		$routeProvider.otherwise({
			redirectTo: '/Starter'
		});
	}]);
})();