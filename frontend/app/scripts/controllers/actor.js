angular.module('CampusMediusApp')
  .controller('ActorController', ['$scope', '$sce', '$routeParams', '$location', '$compile', 'ActorService', function ($scope, $sce, $routeParams, $location, $compile, ActorService) {
      $scope.actor=false;
      $scope.actorDescription = '';

      // i still dont understand how calling $location.path will magically preserve the 
      // search params in the url, but i love it
      $scope.killActor = function() {
        $scope.actor = false;
        $location.path('/actors');
      };
      
      $scope.$on('showActor', function(event, args) {
          $scope.actor = ActorService.get($routeParams.actorId);
          var description = $scope.actor.description;
          var compiled = $compile(description)($scope);
          angular.element('#actor-description')
            .empty()
            .append(compiled);
      });  
      $scope.$on('mediaObjectClicked', function(e, args) {
        var index = parseInt(args.id) - 1;
        angular.element('.rn-carousel-indicator>span:eq(' + index +')').click();
        $scope.$apply();
      })
    }]);