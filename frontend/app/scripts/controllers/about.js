'use strict';

angular.module('CampusMediusApp')
  .controller('AboutController', ['$scope', '$sce', 'PageService', function ($scope, $sce, PageService) {
    $scope.page = undefined;
    PageService.getPage('about')
        .then(function(pageData) {
            $scope.page = pageData;
            // for some reason, $sce is getting to this thing and 
            // parsing it twice, which throws an error. that's why
            // i'm checking for a string. so weird...
            if(typeof $scope.page.body === 'string') {
                $scope.page.body = $sce.trustAsHtml($scope.page.body);
            }
        });
    }]);