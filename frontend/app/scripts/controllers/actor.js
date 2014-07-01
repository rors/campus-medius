angular.module('CampusMediusApp')
  .controller('ActorController', ['$scope', '$sce', '$routeParams', '$location', 'ActorService', function ($scope, $sce, $routeParams, $location, ActorService) {
      $scope.actor=false;

      // i still dont understand how calling $location.path will magically preserve the 
      // search params in the url, but i love it
      $scope.killActor = function() {
        $scope.actor = false;
        $location.path('/actors');
      };

      $scope.$on('showActor', function(event, args) {
          $scope.actor = ActorService.get($routeParams.actorId);
          $scope.actor.description =  $sce.trustAsHtml($scope.actor.description);
      });  
    }]);