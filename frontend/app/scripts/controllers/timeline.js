'use strict';

angular.module('CampusMediusApp')
  .controller('TimelineCtrl', function ($scope, FilterService, ActorService) {
    $scope.lanes = []; // holds lane data for showing timeline items
    $scope.timelineSlider = FilterService.all();
    $scope.translateTimeline = function(hours) {
      // so the timeline starts at 2pm at goes til 2pm the next day, 
      var displayTime = hours+14;
      if(displayTime > 23) {
        displayTime-=24;
      }
      function pad(num, digits) {
          return ("0" + num).slice(digits * -1);
      }
      return pad(displayTime, 2) + ':00';
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
      var _lanes = [[data[0]]]; // initialize the first lane to the first
      for(var i=1; i<data.length; i++) {
          var _actor = data[i];
          var laneLength = _lanes.length;
          var inLane = false;
           for(var j=0; j<laneLength; j++){
               if(new Date(_actor.start_time) >= new Date(_lanes[j][_lanes[j].length-1].end_time)) {
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
      $scope.lanes = _lanes;
    };
    ActorService.all()
      .success(function(data) {
        $scope.makeLanes(data.objects);
      })
      .error(function(data, status, headers, config) {
          console.log('error', data, status, headers, config);
      });
  });
