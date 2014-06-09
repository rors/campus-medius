'use strict';

angular.module('CampusMediusApp', [
    'ngAnimate',
    'ngTouch',
    'angularSlideables',
    'leaflet-directive',
    'ngRoute',
    'rzModule',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    'com.2fdevs.videogular.plugins.poster',
    'angularMoment',
    'angular-carousel'
])
    .constant("ICON_SIZES", {
        icon: {
            DEFAULT: [54, 81],
            LARGE: [60, 90]
        },
        anchor: {
            DEFAULT: [20, 81],
            LARGE: [20, 90]
        },
        popup: [0, 60]
    })
    .constant('STATIC_URL', 'http://campusmedius.net')
    .constant('API_ENDPOINT', 'http://campusmedius.net/data/api/event/?format=json')
    .config(function($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true)
        $routeProvider
            .when('/actors/:actorId?', {
                templateUrl: 'views/map.html',
                reloadOnSearch: false,
                controller: 'MapController'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })
            .when('/team', {
                templateUrl: 'views/team.html',
                controller: 'TeamController'
            })
            .when('/topography', {
                templateUrl: 'views/topography.html',
                controller: 'TopographyController'
            })
            .otherwise({
                redirectTo: '/actors'
            });
    })
    .run(function($rootScope) {
        $rootScope.$on('actorTriggered', function(event, args) {
            $rootScope.$broadcast('showActor', args);
        });    
    });
