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
            theme: {
                playIcon: "&#xe000;",
                pauseIcon: "&#xe001;",
                volumeLevel3Icon: "&#xe002;",
                volumeLevel2Icon: "&#xe003;",
                volumeLevel1Icon: "&#xe004;",
                volumeLevel0Icon: "&#xe005;",
                muteIcon: "&#xe006;",
                enterFullScreenIcon: "&#xe007;",
                exitFullScreenIcon: "&#xe008;"
            },
            plugins: {
                poster: {
                    url: "images/videogular.png"
                }
            }
        };
  });
