'use strict';

angular.module('CampusMediusApp')
  .controller('VideoCtrl', ['$scope', '$sce', function ($scope, $sce) {
        $scope.getIframeSrc = function(id) {
            return  $sce.trustAsResourceUrl('http://player.vimeo.com/video/' + id);
        }
  }]);
