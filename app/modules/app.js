(function() {
"use strict";


// Declare app level module which depends on filters, and services
angular.module('StarterApp', [
  'ngRoute',
  'Starter'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Starter', {templateUrl: 'modules/Starter/views/starter.html', controller: 'StarterCtrl'});
  //$routeProvider.when('/call/:CallId', {templateUrl: 'calls/views/call.html', controller: 'CallsCtrl'});
  //$routeProvider.when('/addTask', {templateUrl: 'partials/addTask.html', controller: 'CallsCtrl'});
  //$routeProvider.when('/editCall', {templateUrl: 'partials/editCall.html', controller: 'CallsCtrl'});
  //$routeProvider.when('/addNote', {templateUrl: 'partials/addNote.html', controller: 'CallsCtrl'});
  //$routeProvider.when('/login', {templateUrl: 'login/views/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/Starter'});
}]);
})();
