'use strict';

angular.module('CampusMediusApp')
  .controller('TimelineCtrl', function ($scope, FilterService, ActorService) {
    $scope.lanes = []; // holds lane data for showing timeline items
    $scope.timelineSlider = FilterService.all();
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
        FilterService.set('start', newVal);
        $scope.filterActors();
      }
    });

    $scope.$watch('timelineSlider.max', function(oldVal, newVal) {
      if(oldVal !== newVal) {
        FilterService.set('end', newVal);
        $scope.filterActors();
      }
    });

    // returns an array of arrays
    // each lane contains objects in consecutive time chunks
    $scope.makeLanes = function(data) {
      console.log('lanedate', data);
      var _lanes = [[data[0]]]; // initialize the first lane to the first
      for(var i=1; i<data.length; i++) {
          var _actor = data[i];
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
      console.log('lanes', _lanes);
      $scope.lanes = _lanes;
    };
    ActorService.all()
      .success(function(data) {
        $scope.makeLanes(data.objects);
        console.log('lanes', data.objects);
      })
      .error(function(data, status, headers, config) {
          console.log('error', data, status, headers, config);
      });
  });
