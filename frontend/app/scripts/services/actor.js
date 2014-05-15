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
                    // add bubble text
                    var i = 
                    angular.forEach(data, function(val, key) {
                        val.id = key;
                        val.message = '<strong>' + val.id + '-' + val.name + '-' + 'SCHLOSSPARK SCHONBRUNN</strong><br/><em>14 May 1933 | 9 a.m. - 12 p.m.</em><br><a class="btn btn-sm btn-primary" ng-click="showActor(' + val.id + ')">view</a>';
                        val.min = val.start;
                        val.max = val.end;
                    });
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
            var data = actors.filter(function(el) {
                if(params.hasOwnProperty('historical')) {
                    if(el.historical !== params.historical) {
                        return false;
                    }
                }
                // given 2 time ranges S1-->E1 and S2-->E2
                // determine if 2 ranges overlap. S1 <= E2 && S2 <= E1
                if(el.min <= params.max && params.min <= el.max) {
                    return el;
                }
            });
            return data;
        }
    };
  });