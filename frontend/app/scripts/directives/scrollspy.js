'use strict';

angular.module('CampusMediusApp')
  .directive('scrollSpy', function () {
    return {
      restrict: 'A',
      controller: function($scope) {
        $scope.spies = [];
        $scope.test = 0;
        setTimeout(function(){console.log('$scope.test changed');$scope.test = 8}, 1000)
        this.addSpy = function(spyObj) {
          $scope.spies.push(spyObj);
        };
      },
      link: function(scope, elem, attrs) {
        var spyElems = [];
        scope.$watch('spies', function(spies) {
          for (var _i = 0; _i < spies.length; _i++) {
            var spy = spies[_i];
            if (spyElems[spy.id] == null) {
              spyElems[spy.id] = (elem.find('#' + spy.id));
            }
          }
          scrollHandler();
        }, true);

        var $spyWindow = $('#spy-window .text-window');
        //var $spyWindow = $window;
        function scrollHandler() {
          var highlightSpy, pos, spy, _i, _len, _ref;
          highlightSpy = null;
          _ref = scope.spies;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            spy = _ref[_i];
            spy.out();
            spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];
            if (spyElems[spy.id].length !== 0) {
              //console.log(spy.id, spyElems[spy.id].position().top , $spyWindow.scrollTop());
              if ((pos = spyElems[spy.id].position().top) <= 0) {
                spy.pos = pos;
                if (highlightSpy == null) {
                  highlightSpy = spy;
                }
                if (highlightSpy.pos < spy.pos) {
                  highlightSpy = spy;
                }
              }
            }
          }
          return highlightSpy != null ? highlightSpy["in"]() : void 0;
        };

        $($spyWindow).scroll(scrollHandler);
      }
    };
  });
