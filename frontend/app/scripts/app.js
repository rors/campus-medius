'use strict';

angular.module('CampusMediusApp', [
    'ngAnimate',
    'ngTouch',
    'angularSlideables',
    'leaflet-directive',
    'ngRoute',
    'rzModule',
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
        shadow: {
            DEFAULT: [74, 111],
            LARGE: [60, 90]
        },
        shadowAnchor: {
            DEFAULT: [30, 94],
            LARGE: [20, 90]
        },
        popup: [0, 60]
    })
    .constant('STATIC_URL', 'http://api.campusmedius.net')
    .constant('API_ENDPOINT_ACTORS', 'http://api.campusmedius.net/events/event/?format=json')
    .constant('API_ENDPOINT_PAGES', 'http://api.campusmedius.net/website/pages/page/?format=json')
    .constant('API_ENDPOINT_TEAM', 'http://api.campusmedius.net/website/teammembers/teammember/?format=json')
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true)
        $routeProvider
            .when('/actors/:actorId?', {
                templateUrl: '/views/map.html',
                reloadOnSearch: false,
                controller: 'MapController'
            })
            .when('/about', {
                templateUrl: '/views/about.html',
                controller: 'AboutController'
            })
            .when('/team', {
                templateUrl: '/views/team.html',
                controller: 'TeamController'
            })
            .when('/topography', {
                templateUrl: '/views/topography.html',
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
        $rootScope.$on('mediaObjectClicked', function(event, args) {
            $rootScope.$broadcast('showMediaObject', args);
        });
    });
