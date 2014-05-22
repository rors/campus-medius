'use strict';

angular.module('CampusMediusApp', [
    'ngAnimate',
    'angularSlideables',
    'leaflet-directive',
    'ngRoute',
    'rzModule',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    'com.2fdevs.videogular.plugins.poster',
    'angularMoment'
])
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
    });
