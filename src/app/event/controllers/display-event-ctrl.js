(function() {

	'use strict';
	var module = angular.module('event');

	function controller($scope, $window, $http, EventsService, $routeParams, toastr, ngDialog, $rootScope, 
		AuthenticationService) {
		console.log($routeParams.type);

      var eventsType = $routeParams.type,
        keyword, pastEvents = [],
        latestEvents = [],
        today,
        epoch, isEventsPresentinSession, LoadedEvents;

      function DisplayEvents(eventsType) {
        console.log("Type =" + eventsType);
        if (eventsType === 'past') {
          $rootScope.filteredEvents = pastEvents;
        } else {
          $rootScope.filteredEvents = latestEvents;
        }
      }

      function _initilize() {
        AuthenticationService.CheckForLoggedin();
        $scope.eventsList = {};
        $rootScope.filteredEvents = {};
        $scope.dialogShown = true;
        $scope.hideSearchBar = true;
        $rootScope.hideMenu = false; 
        keyword = $routeParams.search;
        LoadDateTimeFunction();

        if (eventsType !== "" && eventsType !== null && eventsType !== undefined) {
          LoadEvents(eventsType);
        }
        DisplayEvents(eventsType);

        if (keyword !== "" && keyword !== null && keyword !== undefined) {
          $scope.SearchEvent(keyword.toLowerCase());
        } else {
          if (eventsType === 'past') {
           // $window.location.href = '/#/dashboard/events?type=past';
          } else {
           // $window.location.href = '/#/dashboard/events?type=latest';
          }
        }
      }

      $scope.ConfirmDelete = function(event) {
        $rootScope.EventtobeDeleted = event;
        ngDialog.open({
          template: 'app/event/views/template.html',
          controller: 'DialogCtrl',
          className: 'ngdialog-theme-default ngdialog-theme-custom'
        });
      };

      $scope.ShowEventDetails = function(event) {
        var stringevent = JSON.stringify(event);
        sessionStorage.setItem('currentEvent', stringevent);
        $window.location.href = '#/e' + '?key=' + event.key;
      }

      $scope.SearchEvent = function(keyword) {
        $scope.hideSearchBar = false;
        var pastEvents = [];
        var latestEvents = [];
        CheckLastSession();
        if (isEventsPresentinSession) {
          LoadEventsFromSession();
        }
        angular.forEach($scope.eventsList, function(event) {
          if (event.name.toLowerCase().indexOf(keyword) != -1) {
            if (parseInt(event.start_time) < epoch) {
              pastEvents.push(event);
            } else {
              latestEvents.push(event);
            }
          }
        });
        $rootScope.filteredEvents = null;
        if (pastEvents.length > 0) {
          latestEvents.push(pastEvents);
        }
        //$scope.filteredEvents.push(latestEvents); 
        debugger;
        $rootScope.filteredEvents = latestEvents;
        console.log("result of search");
        console.log($rootScope.filteredEvents);
      }

      $scope.EditEvent = function(event) {
      var stringevent = JSON.stringify(event);
        sessionStorage.setItem('EditEventDetails', stringevent);
        $window.location.href = '#/edit-event?key=' + event.key;
      }

      function LoadEventsFromSession() {
        $scope.eventsList = JSON.parse(LoadedEvents);
      }

      function CheckLastSession() {
        var LastEventFetchedDate = sessionStorage.getItem('eventsFetchedDate');
        LoadedEvents = sessionStorage.getItem('allEvents');
        var TodaysDate = today.today();
        if (LoadedEvents !== 'undefined' && LoadedEvents != null && LoadedEvents != '' &&
          TodaysDate === LastEventFetchedDate) {
          isEventsPresentinSession = true;
        } else {
          isEventsPresentinSession = false;
        }
      }

      function LoadDateTimeFunction() {
        today = new Date();
        Date.prototype.today = function() {
          return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
        }
        Date.prototype.timeNow = function() {
          return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
        }
      }

      function ProcessEvents(Type) {
        epoch = moment(today.today() + " " + today.timeNow(), "D/M/YYYY H:mm").unix();
        console.log(today.today() + " " + today.timeNow());
        angular.forEach($scope.eventsList, function(event) {
          if (Type === 'past') {
            console.log("evluating past");
            $scope.Heading = "All Past Events: before " + today.today() + " " + today.timeNow();
            if (parseInt(event.start_time) < epoch) {
              var GMTTime = moment.unix(event.start_time);
              event.start_time = moment(GMTTime).subtract({
                'hours': '5',
                'minutes': '30'
              }).format('ll HH:mm');
              pastEvents.push(event);
            }
          } else {
            console.log("evluating latest");
            $scope.Heading = "All Latest Events: after " + today.today() + " " + today.timeNow();
            if (parseInt(event.start_time) >= epoch) {
              var GMTTime = moment.unix(event.start_time).format('ll HH:mm');
              event.start_time = moment(GMTTime).subtract({
                'hours': '5',
                'minutes': '30'
              }).format('ll HH:mm');
              latestEvents.push(event);
            }
          }
        });
      }

      function LoadEventfromEventService() {
        EventsService.GetEvents(function() {})
          .then(function(response) {
            $scope.eventsList = response.data.events;
            sessionStorage.setItem('allEvents', JSON.stringify(response.data.events));
            sessionStorage.setItem('eventsFetchedDate', today.today());
            ProcessEvents(eventsType);
          });
      }

      function LoadEvents(Type) {
        CheckLastSession();

        if (isEventsPresentinSession) {
          LoadEventsFromSession();
          ProcessEvents(eventsType);
        } else {
          LoadEventfromEventService();
        }
      };
      _initilize();
    }

	module.controller('display-eventCtrl', ['$scope', '$window', '$http', 'EventsService', '$routeParams', 'toastr', 'ngDialog', '$rootScope',
    'AuthenticationService',controller]);

})();