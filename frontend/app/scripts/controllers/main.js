'use strict';

angular.module('CampusMediusApp')
  .controller('MapController', [ '$scope', '$http', '$compile', '$location', '$routeParams', 'ActorService', 'FilterService', function($scope, $http, $compile, $location, $routeParams, ActorService, FilterService) {
    angular.extend($scope, {
      actors: [],
      actorShow: false,
      markers: [],
      centerMarker: {
          lat: 48.21037530761021,
          lng: 16.384735107421875,
          zoom: 13
      },
      layers: {
          baselayers: {
              vienna: {
                  name: 'Vienna 1933',
                  url: 'http://a.tiles.mapbox.com/v3/campusmedius.campusmedius/{z}/{x}/{y}.png',
                  type: 'xyz'
              }
          }
      },
      events: {
          map: {
              enable: ['click', 'popupopen'],
              logic: 'emit'
          }
      },
      // TODO: hard coded; should come from service
      historical: ['All', 'Sovereign', 'Disciplinary', 'Control']
    });  

    $scope.$watch( 
      function () { return FilterService.get('min'); }, 

      function (data) {
        $scope.filterActors();
      }, true);

    $scope.$watch( 
      function () { return FilterService.get('max'); }, 

      function (data) {
        $scope.filterActors();
      }, true);

    $scope.filterActors = function() {
      var params = {};
      if($scope.historicalFilter && $scope.historicalFilter !== 'All') {
          params.historical = $scope.historicalFilter;
      }
      params.min = FilterService.get('min')
      params.max = FilterService.get('max')

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
      if($routeParams.hasOwnProperty('min')) {
        FilterService.set('min', $routeParams.min);
      }
      if($routeParams.hasOwnProperty('max')) {
        FilterService.set('max', $routeParams.max);
      }
      if($routeParams.hasOwnProperty('actorId')) {
          $scope.actor = ActorService.get($routeParams.actorId);
          console.log('gotit', $scope.actor);
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
    $scope.iconDefaults = {
        defaultIcon: {
          iconSize: [30, 45]
        },
        biggerIcon: {
            iconSize: [36, 54]
        }
    };

    $scope.highlightActor = function(id, toDefault){
      id = parseInt(id);
      for(var i=0; i<$scope.markers.length; i++) {
        console.log('searching for', id);
          if($scope.markers[i].id === id) {
              if(!toDefault){
                angular.extend($scope.markers[i].icon, $scope.iconDefaults.biggerIcon);
              } else {
                angular.extend($scope.markers[i].icon, $scope.iconDefaults.defaultIcon);
              }
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
          $scope.actors = data;
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
    $scope.$on('leafletDirectiveMap.click', function(event, e){
      console.log('leaf', e.leafletEvent.latlng);
    });

    // only gets called once. all subsequent filtering is handled in-app
    $scope.getActors();

  }]);
  