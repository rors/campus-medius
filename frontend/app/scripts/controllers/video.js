'use strict';

angular.module('CampusMediusApp')
  .controller('VideoCtrl', function ($scope, $sce) {
    /* please work */
    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.state = null;
    $scope.volume = 1;
    $scope.isCompleted = false;
    $scope.API = null;

    $scope.onPlayerReady = function(API) {
      $scope.API = API;
    };

    $scope.onCompleteVideo = function() {
      $scope.isCompleted = true;
    };

    $scope.onUpdateState = function(state) {
      $scope.state = state;
    };

    $scope.onUpdateTime = function(currentTime, totalTime) {
      $scope.currentTime = currentTime;
      $scope.totalTime = totalTime;
    };

    $scope.onUpdateVolume = function(newVol) {
      $scope.volume = newVol;
    };

    $scope.onUpdateSize = function(width, height) {
      $scope.config.width = width;
      $scope.config.height = height;
    };

    $scope.stretchModes = [
      {label: 'None', value: 'none'},
      {label: 'Fit', value: 'fit'},
      {label: 'Fill', value: 'fill'}
    ];

    $scope.config = {
      width: 200,
      height: 375,
      autoHide: false,
      autoHideTime: 3000,
      autoPlay: false,
      responsive: false,
      stretch: $scope.stretchModes[0],
      sources: [
          {src: $sce.trustAsResourceUrl('http://campusmedius.s3.amazonaws.com/assets/fox-newsreel_schoenbrunn-rally.mp4.mp4'), type: 'video/mp4'},
          {src: $sce.trustAsResourceUrl('http://campusmedius.s3.amazonaws.com/assets/fox-newsreel_schoenbrunn-rally.webmhd.webm'), type: 'video/webm'},
          {src: $sce.trustAsResourceUrl('http://campusmedius.s3.amazonaws.com/assets/fox-newsreel_schoenbrunn-rally.oggtheora.ogv'), type: 'video/ogg'}
      ],
      transclude: true,
      plugins: {
          poster: {
              url: 'images/videogular.png'
          }
      }
    };

    $scope.changeSource = function() {
      $scope.config.sources = [
          {src: $sce.trustAsResourceUrl('http://vjs.zencdn.net/v/oceans.mp4'), type: 'video/mp4'},
          {src: $sce.trustAsResourceUrl('http://vjs.zencdn.net/v/oceans.webm'), type: 'video/webm'}
      ];
    };
  });
