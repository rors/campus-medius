'use strict';

angular.module('CampusMediusApp')
  .directive('mediaObject', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
       // console.log('um... ok', scope, element, attrs);
       angular.element(element).bind('click', function() {
        console.log('clicked', this);
        scope.$emit('mediaObjectClicked', { id: attrs.media });
       });
      }
    };
  });
