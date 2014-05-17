'use strict';

angular.module('CampusMediusApp')
  .directive('spy', function ($location) {
    return {
            restrict: "A",
            require: "^scrollSpy",
            link: function(scope, elem, attrs, scrollSpy) {
              if (attrs.spyClass == null) {
                attrs.spyClass = "active";
              }
              elem.click(function() {
                scope.$apply(function() {
                  $location.hash(attrs.spy);
                });
              });
              scrollSpy.addSpy({
                id: attrs.spy,
                in: function() {
                  elem.addClass(attrs.spyClass);
                  $(window).trigger('resize');
                },
                out: function() {
                  elem.removeClass(attrs.spyClass);
                }
              });
            }
          };
  });
