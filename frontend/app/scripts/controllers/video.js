'use strict';

angular.module('CampusMediusApp')
  .controller('VideoCtrl', function ($scope, $sce) {
        $scope.getIframeSrc = function(id) {
            console.log(id);
            return  $sce.trustAsResourceUrl('//player.vimeo.com/video/' + id);
        }
  });
