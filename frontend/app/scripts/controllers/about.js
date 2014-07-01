angular.module('CampusMediusApp')
  .controller('AboutController', ['$scope', '$sce', 'PageService', function ($scope, $sce, PageService) {
    PageService.getPage('about')
        .then(function(pageData) {
            $scope.page = pageData;
            $scope.page.body = $sce.trustAsHtml($scope.page.body);
        })
    }]);