'use strict';

angular.module('CampusMediusApp')
  .controller('MapController', [ '$scope', '$sce', '$http', '$compile', '$location', '$routeParams', 'ActorService', function($scope, $sce, $http, $compile, $location, $routeParams, ActorService) {
    $scope.actors = [];    // holds all our actors so we dont have to fetch them from API again
    $scope.actorShow = false;           // either false or an actor object; if actor object, then show actor template
    $scope.markers = [];   // current set of points that are shown on our map.

    // TODO: hard-coded to Vienna but should probably come from some dynamic source
    $scope.centerMarker = {
      lat: 48.20817,
      lng: 16.37382,
      zoom: 8
    };
    // TODO: also hard coded; should come from service
    $scope.historical = ['All', 'Sovereign', 'Disciplinary', 'Control'];

    // TODO: all of this timeline stuff should really be broken out into its own directive
    $scope.lanes = []; // holds lane data for showing timeline items
    $scope.timelineSlider = {
      min: 0,
      max: 24,
      floor: 0,
      ceil: 24,
      step: 1
    };
    $scope.translateTimeline = function(hours) {
      //it is pm if hours from 12 onwards
      var suffix = (hours >= 12)? 'pm' : 'am';

      //only -12 from hours if it is greater than 12 (if not back at mid night)
      hours = (hours > 12) ? hours -12 : hours;

      //if 00 then it is 12 am
      hours = (hours === '00')? 12 : hours;

      return hours + suffix;
    };

    $scope.$watch('timelineSlider.min', function(oldVal, newVal) {
      if(oldVal !== newVal) {
          $scope.filterActors();
      }
    });

    $scope.$watch('timelineSlider.max', function(oldVal, newVal) {
      if(oldVal !== newVal) {
          $scope.filterActors();
      }
    });

    // returns an array of arrays
    // each lane contains objects in consecutive time chunks
    $scope.makeLanes = function(data) {
      var _lanes = [];
      for(var i=0; i<data.length; i++) {
          var _actor = data[i];
          if(i === 0) {
              _lanes.push([_actor]);
          } else {
              var laneLength = _lanes.length;
              var inLane = false;
               for(var j=0; j<laneLength; j++){
                   if(_actor.start >= _lanes[j][_lanes[j].length-1].end) {
                      _lanes[j].push(_actor);
                      inLane = true;
                      break;
                  }
               }
               // item didnt fit in any of the existing lanes so make a new one
               if(!inLane) {
                  _lanes.push([_actor]);
               }
          }
      }
      $scope.lanes = _lanes;
    };

    $scope.filterActors = function() {
      var params = {};
      if($scope.historicalFilter && $scope.historicalFilter !== 'All') {
          params.historical = $scope.historicalFilter;
      }
      params.start = $scope.timelineSlider.min;
      params.end = $scope.timelineSlider.max;

      var _markers = ActorService.search(params);
      
      // updates our map markers
      angular.extend($scope, {
          markers: _markers
      });

      // apply the search params only if we're not in actor view. 
      // angular is kind enough to preserve our search params when we use the 
      // actorId part of the route
      if(!$scope.actor) {
          $location.search(params);
      }
    };

    // listens for changes in url, and fires the update
    $scope.$on('$routeUpdate', function(){
      $scope.applyRouteParams();
    });

    // this makes sure the UI controls are in sync w the filters in URL
    $scope.applyRouteParams = function() {
      if($routeParams.hasOwnProperty('historical') && $routeParams.historical !== 'undefined') {
          $scope.historicalFilter = $routeParams.historical;
      } else {
          $scope.historicalFilter = undefined;
      }
      if($routeParams.hasOwnProperty('start')) {
          $scope.timelineSlider.min = $routeParams.start;
      }
      if($routeParams.hasOwnProperty('end')) {
          $scope.timelineSlider.max = $routeParams.end;
      }
      if($routeParams.hasOwnProperty('actorId')) {
          $scope.actor = ActorService.get($routeParams.actorId);
          $scope.actorShow = true;
      } else {
          $scope.actor = false;
          $scope.actorShow = false;
      }

      $scope.filterActors();
    };


    $scope.showActor = function(id) {
      $location.path('/actors/' + id);
    };
    $scope.highlightActor = function(id, toDefault){
      var icons = {
          defaultIcon: {},
          biggerIcon: {
              iconSize: [30, 49]
          }
      };

      for(var i=0; i<$scope.markers.length; i++) {
          if($scope.markers[i].id === id) {
              $scope.markers[i].icon = toDefault? icons.defaultIcon : icons.biggerIcon;
              break;
          }
      }
    };

    // i still dont understand how calling $location.path will magically preserve the 
    // search params in the url, but i love it
    $scope.killActor = function() {
      $scope.actor = false;
      $location.path('/actors');
    };

    // low-fi way of getting actors from our API
    $scope.getActors = function() {
      ActorService.all()
      .success(function(data) {
          // add bubble text
          angular.forEach(data, function(val) {
              val.message = '<strong>SCHLOSSPARK SCHONBRUNN</strong><br/><em>14 May 1933 | 9 a.m. - 12 p.m.</em><br><a class="btn btn-sm btn-primary" ng-click="showActor(' + val.id + ')">view</a>';
          });

          $scope.actors = data;
          $scope.makeLanes($scope.actors);
          $scope.applyRouteParams();
      }).
      error(function(data, status, headers, config) {
          console.log('error', data, status, headers, config);
      });
    };

    // since we are using directives inside our popups, we have to compile them
    // before they can be used
    $scope.$on('leafletDirectiveMap.popupopen', function(event, leafletEvent){
    var newScope = $scope.$new();
    $compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
    });

    // only gets called once. all subsequent filtering is handled in-app
    $scope.getActors();
  }]);
