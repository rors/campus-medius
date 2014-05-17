angular.module('CampusMediusApp')
  .controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation.replace('#', '') === $location.path();
    };
  });