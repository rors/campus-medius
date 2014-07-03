'use strict';

angular.module('CampusMediusApp')
  .controller('MapController', [ 
      '$scope',
      '$http', 
      '$compile', 
      '$location', 
      '$routeParams', 
      'ActorService', 
      'FilterService', 
      'ICON_SIZES', 
      function($scope, $http, $compile, $location, $routeParams, ActorService, FilterService, ICON_SIZES) {
	  angular.extend($scope, {
	      actors: [],
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
		      },
		      osm: {
			  name: 'OpenStreetMap',
			  url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			  type: 'xyz'
		      },
		      cloudmade2: {
			  name: 'Cloudmade Tourist',
			  type: 'xyz',
			  url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
			  layerParams: {
			      key: '007b9471b4c74da4a6ec7ff43552b16f',
			      styleId: 7
			  }
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

	      var markers_and_paths = ActorService.search(params);
	      // updates our map markers
	      angular.extend($scope, {
		  markers: markers_and_paths.markers,
		  paths: markers_and_paths.paths
	      });

	      console.log('markers_and_paths.paths', markers_and_paths.paths);

	      $location.search(params);
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
		  $scope.$emit('actorTriggered', {message: $routeParams.actorId});
	      }

	      $scope.filterActors();
	  };


	  $scope.showActor = function(id) {
	      $location.path('/actors/' + id);
	  };

	  $scope.highlightActor = function(slug, toDefault){
	      for(var i=0; i<$scope.markers.length; i++) {
		  if($scope.markers[i].slug === slug) {
		      if(!toDefault){
			  $scope.markers[i].icon.iconSize = ICON_SIZES.icon['LARGE'];
			  $scope.markers[i].icon.iconAnchor = ICON_SIZES.anchor['LARGE'];
		      } else {
			  $scope.markers[i].icon.iconSize = ICON_SIZES.icon['DEFAULT'];
			  $scope.markers[i].icon.iconAnchor = ICON_SIZES.anchor['DEFAULT'];
		      }
		      break;
		  }
	      }
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
	  
      }
  ]);
  