angular.module('CampusMediusApp')
.directive('resize', function ($window) {
    return {
        link: function(scope, elem) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };

            scope.onResizeFunction = function(){
                var styles = {
                    'height': (w.height()-118) + 'px',
                    'width': (w.width()) + 'px'
                };
                angular.element(elem).css(styles);
                
            };

            angular.element($window).bind('resize', function() {
                scope.onResizeFunction();
            });
            scope.onResizeFunction();
        }
    }
})