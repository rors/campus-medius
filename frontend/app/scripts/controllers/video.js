'use strict';

angular.module('CampusMediusApp')
  .controller('VideoCtrl', function ($scope, $sce) {
    $scope.stretchModes = [
            {label: "None", value: "none"},
            {label: "Fit", value: "fit"},
            {label: "Fill", value: "fill"}
        ];

        $scope.config = {
            width: 740,
            height: 380,
            autoHide: false,
            autoPlay: false,
            responsive: true,
            stretch: $scope.stretchModes[1],
            plugins: {
                poster: {
                    url: "images/videogular.png"
                }
            }
        };
  });
