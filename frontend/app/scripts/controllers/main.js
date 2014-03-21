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


    /* please work */
    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.state = null;
    $scope.volume = 1;
    $scope.isCompleted = false;
    $scope.API = null;

    $scope.onPlayerReady = function(API) {
      $scope.API = API;
    };

    $scope.onCompleteVideo = function() {
      $scope.isCompleted = true;
    };

    $scope.onUpdateState = function(state) {
      $scope.state = state;
    };

    $scope.onUpdateTime = function(currentTime, totalTime) {
      $scope.currentTime = currentTime;
      $scope.totalTime = totalTime;
    };

    $scope.onUpdateVolume = function(newVol) {
      $scope.volume = newVol;
    };

    $scope.onUpdateSize = function(width, height) {
      $scope.config.width = width;
      $scope.config.height = height;
    };

    $scope.stretchModes = [
      {label: 'None', value: 'none'},
      {label: 'Fit', value: 'fit'},
      {label: 'Fill', value: 'fill'}
    ];

    $scope.config = {
      width: 200,
      height: 375,
      autoHide: false,
      autoHideTime: 3000,
      autoPlay: false,
      responsive: false,
      stretch: $scope.stretchModes[0],
      sources: [
          {src: $sce.trustAsResourceUrl('http://campusmedius.s3.amazonaws.com/assets/fox-newsreel_schoenbrunn-rally.mp4.mp4'), type: 'video/mp4'},
          {src: $sce.trustAsResourceUrl('http://campusmedius.s3.amazonaws.com/assets/fox-newsreel_schoenbrunn-rally.webmhd.webm'), type: 'video/webm'},
          {src: $sce.trustAsResourceUrl('http://campusmedius.s3.amazonaws.com/assets/fox-newsreel_schoenbrunn-rally.oggtheora.ogv'), type: 'video/ogg'}
      ],
      transclude: true,
      theme: {
          url: 'styles/themes/default/videogular.css',
          playIcon: '&#xe000;',
          pauseIcon: '&#xe001;',
          volumeLevel3Icon: '&#xe002;',
          volumeLevel2Icon: '&#xe003;',
          volumeLevel1Icon: '&#xe004;',
          volumeLevel0Icon: '&#xe005;',
          muteIcon: '&#xe006;',
          enterFullScreenIcon: '&#xe007;',
          exitFullScreenIcon: '&#xe008;'
      },
      plugins: {
          poster: {
              url: 'images/videogular.png'
          },
          ads: {
              companion: 'companionAd',
              companionSize: [728, 90],
              network: '6062',
              unitPath: 'iab_vast_samples',
              adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=%2F6062%2Fiab_vast_samples&ciu_szs=300x250%2C728x90&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]&cust_params=iab_vast_samples%3Dlinear'
          }
      }
    };

    $scope.changeSource = function() {
      $scope.config.sources = [
          {src: $sce.trustAsResourceUrl('http://vjs.zencdn.net/v/oceans.mp4'), type: 'video/mp4'},
          {src: $sce.trustAsResourceUrl('http://vjs.zencdn.net/v/oceans.webm'), type: 'video/webm'}
      ];
    };
    /* */
    }]);
