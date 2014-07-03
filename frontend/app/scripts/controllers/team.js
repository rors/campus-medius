'use strict';

angular.module('CampusMediusApp')
  .controller('TeamController', ['$scope', '$sce', 'TeamService', 'STATIC_URL', function ($scope, $sce, TeamService, STATIC_URL) {
        $scope.page = undefined;
        $scope.STATIC_URL = STATIC_URL;
        TeamService.getMembers()
            .then(function(members) {
                $scope.members = members;
                console.log($scope.members);
                $scope.current = members[0].slug;
            });

        $scope.trustHtml = function(txt) {
            return $sce.trustAsHtml(txt);
        };
    }]);