'use strict';

angular.module('CampusMediusApp')
  .directive('cmPopup', function () {
    return {
      template: '<div>I am a popup</div>',
      restrict: 'E',
      scope: {
          content: '=content'
      },
      link: function postLink(scope, element, attrs) {
        element.text('this is the cmPopup directive');
        console.log(scope, attrs);
      }
    };
  });
