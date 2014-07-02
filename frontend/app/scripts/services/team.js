'use strict';

angular.module('CampusMediusApp')
  .service('TeamService', function TeamService($window, $http, API_ENDPOINT_TEAM) {
    var teamPromise;

    return {
        getMembers: function(slug) {
            if(teamPromise) {
                return teamPromise;
            }
            var request = $http({
                method: 'GET',
                cache: true,
                url: API_ENDPOINT_TEAM
            });
            teamPromise = request.then(function(response) {
                return response.data.objects;
            });
            return teamPromise;
        }
    };
  });
