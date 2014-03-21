'use strict';

angular.module('CampusMediusApp', [
    'leaflet-directive',
    'ngRoute',
    'rzModule',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    'com.2fdevs.videogular.plugins.poster',
    'com.2fdevs.videogular.plugins.imaads'
])
    .config(function($routeProvider) {
        $routeProvider
            .when('/actors/:actorId?', {
                templateUrl: 'views/map.html',
                reloadOnSearch: false,
                controller: 'MapController'
            })
            .otherwise({
                redirectTo: '/actors'
            });
    });
