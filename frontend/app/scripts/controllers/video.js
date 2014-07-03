'use strict';

angular.module('CampusMediusApp')
  .controller('VideoCtrl', function ($scope, $sce) {
        $scope.getIframeSrc = function(id) {
            console.log(id);
            return  $sce.trustAsResourceUrl('http://player.vimeo.com/video/' + id);
        }

        $scope.trustHtml = function(txt) {
            return $sce.trustHtml(txt);
        }
  });
