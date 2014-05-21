'use strict';

angular.module('CampusMediusApp')
  .service('ActorService', function Actorservice($window, $http) {
    //var API_ENDPOINT = $window.location.hostname==='127.0.0.1' ? 'http://127.0.0.1:3000/actors' : 'data/actors.json';
    //var API_ENDPOINT = 'data/actors.json';
    var API_ENDPOINT = 'http://campusmedius.net/data/api/event/?format=json';
    var actors = [];
    return {
        all: function() {
            return $http({method: 'GET', url: API_ENDPOINT})
                .success(function(data) {
                    // add bubble text
                    console.log('data', data);
                    function am_or_pm(hour) {
                        return hour > 11 ? 'pm' : 'am';
                    }
                    function pad(num) {
                        return ("0" + num).slice(-2);
                    }
                    function time_string(_date){
                        var date = new Date(_date);
                        var hour = date.getUTCHours();
                        var merid = am_or_pm(hour);
                        var twelveHour = hour > 12 ? hour-12 : hour;
                        return twelveHour + ':' + pad(date.getUTCMinutes()) + ' ' + merid;
                    }

                    var colors = {
                        'national-socialist': '995f46',     //brown
                        'austrofascist': '55ba47',          //green
                        'socialist-communist': 'de3739',    //red
                        'bourgeois': '5c91be'               //blue
                    }
                    // sort them by start_time ascending
                    data.objects.sort(function(a, b){
                        return new Date(a.start_time) - new Date(b.start_time);
                    });
                    angular.forEach(data.objects, function(val, key) {
                        val.id = key+1;
                        val.min = val.start = new Date(val.start_time).getUTCHours();
                        val.max = val.end = new Date(val.end_time).getUTCHours();
                        val.startPercent = val.min/24 * 100;
                        val.endPercent = val.max/24 * 100;
                        var starting = time_string(val.start_time);
                        var ending = time_string(val.end_time);

                        val.icon = {
                            iconUrl: 'http://campusmedius.net' + val.icon
                        }
                        val.color = colors[val.political_affiliation];
                        var template =
                            '<div class="leaflet-popup-content-inner" ng-click="showActor(' + val.id + ')"> \
                                <strong>' + val.title + '</strong><br/> \
                                <em>14 May 1933<br/>' + starting + ' - ' + ending + '</em> \
                            </div>';
                        val.message = template;
                    });
                    actors = data.objects;
                 });
        },
        get: function(id) {
            id = parseInt(id);
            for(var i=0; i<actors.length; i++) {
                if(actors[i].id === id) {
                    console.log('hit!');
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