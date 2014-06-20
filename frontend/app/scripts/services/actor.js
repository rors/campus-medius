'use strict';

angular.module('CampusMediusApp')
  .service('ActorService', function Actorservice($window, $http, ICON_SIZES, STATIC_URL, API_ENDPOINT) {
    //var API_ENDPOINT = $window.location.hostname==='127.0.0.1' ? 'http://127.0.0.1:3000/actors' : 'data/actors.json';
    //var API_ENDPOINT = 'data/actors.json';
    var actors = [];
    return {
        all: function() {
            return $http({method: 'GET', url: API_ENDPOINT})
                .success(function(data) {
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

                    // get entire duration of this project
                    var project_start = moment(data.objects[0].start_time);
                    var project_end = moment(data.objects[data.objects.length-1].end_time);
                    var project_ms = project_end.diff(project_start);

                    angular.forEach(data.objects, function(val, key) {
                        val.id = key+1;
                        val.isInstant = false; // whether or not this takes place as a single instant in time
                        var startMoment = moment(val.start_time);
                        if(val.end_time) {
                            var endMoment = moment(val.end_time);
                        }
                        else {
                            val.isInstant = true;
                            var endMoment = project_end;
                        }

                        var startDiff = startMoment.diff(project_start);
                        var endDiff = endMoment.diff(project_start);

                        val.startPercent = Math.round(startDiff/project_ms * 100);
                        val.endPercent = Math.round(endDiff/project_ms * 100);

                        var starting = startMoment.format('h:mm a');
                        var ending = endMoment.format('h:mm a')
                        var actor_date = startMoment.format('MMM D, YYYY');

                        val.min = startMoment.diff(project_start, 'hours');
                        val.max = endMoment.diff(project_start, 'hours');

                        val.icon = {
                            iconUrl: STATIC_URL + val.icon,
                            iconSize: ICON_SIZES.icon['DEFAULT'],
                            iconAnchor: ICON_SIZES.anchor['DEFAULT'],
                            popupAnchor: ICON_SIZES.popup
                        }
                        val.color = colors[val.political_affiliation];

                        // filter out sound objects for now
                        var media = [];
                        val.hasVideo = false;
                        val.hasSound = false;
                        val.hasImage = false;
                        val.hasDocument = false;
                        angular.forEach(val.media_objects, function(v, k) {
                            if(v.type!='Sound') {
                                if(v.type === 'Video') {
                                    v.url = STATIC_URL + v.url;
                                    val.hasVideo = true;
                                }
                                if(v.type === 'Image') {
                                    val.hasImage = true;
                                }
                                if(v.type === 'Document') {
                                    val.hasDocument  = true;
                                }
                                media.push(v);
                            }
                        });

                        // TODO: This needs to be in a directive. As it stands, I am embarrassed 
                        // to say I did this. 
                        // TODO: implement this
                        // var template = "<cm-popup content='val'></cm-popup>";
                        var template =
                            '<div class="leaflet-popup-content-inner" ng-click="showActor(\'' + val.slug + '\')"> \
                                <div class="leaflet-popup-column pull-left"> \
                                    <strong>' + val.title + '</strong><br/> \
                                    <em>' + actor_date + '<br/>' + starting + ' <span ng-show="' + !val.isInstant + '">&ndash; ' + ending + '</span></em> \
                                    <ul class="media-icons list-unstyled list-inline"> \
                                        <li ng-if="' + val.hasVideo + '"><span class="icon-video"></span></li> \
                                        <li ng-if="' + val.hasImage + '"><span class="icon-camera"></span></li> \
                                        <li ng-if="' + val.hasSound + '"><span class="icon-sound"></span></li> \
                                        <li ng-if="' + val.hasDocument + '"><span class="icon-newspaper"></span></li> \
                                    </ul> \
                                </div> \
                                <div class="leaflet-popup-column pull-left"> \
                                    <img src="' + STATIC_URL + val.actor_network_image +  '"> \
                                </div> \
                                <span class="btn-explore">explore</span> \
                            </div>';
                        val.message = template;
                        val.media_objects = media;
                    });
                    actors = data.objects;
                 });
        },
        get: function(id) {
            //id = parseInt(id);
            console.log('getting', id);
            for(var i=0; i<actors.length; i++) {
                if(actors[i].slug === id) {
                    return actors[i];
                }
            }
            return false;
        },
        search: function(params) {
            var data = actors.filter(function(el) {
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