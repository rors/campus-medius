'use strict';

angular.module('CampusMediusApp')
  .service('ActorService', function Actorservice($window, $http) {
    //var API_ENDPOINT = $window.location.hostname==='127.0.0.1' ? 'http://127.0.0.1:3000/actors' : 'data/actors.json';
    var API_ENDPOINT = 'data/actors.json';
    var actors = [];
    return {
        all: function() {
            return $http({method: 'GET', url: API_ENDPOINT})
                .success(function(data) {
                    actors = data;
                 });
        },
        get: function(id) {
            for(var i=0; i<actors.length; i++) {
                if(actors[i].id === id) {
                    return actors[i];
                }
            }
            return false;
        },
        search: function(params) {
            return actors.filter(function(el) {
                if(params.hasOwnProperty('historical')) {
                    if(el.historical !== params.historical) {
                        return false;
                    }
                }
                // given 2 time ranges S1-->E1 and S2-->E2
                // determine if 2 ranges overlap. S1 <= E2 && S2 <= E1
                if(el.start <= params.end && params.start <= el.end) {
                    return el;
                }
            });
        }
    };
  });