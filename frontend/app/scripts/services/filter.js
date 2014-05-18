'use strict';

angular.module('CampusMediusApp')
  .service('FilterService', function Filter() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var start, end, historical, actorId;

    var filters = {
      min: 0,
      max: 24,
      floor: 0,
      ceil: 24,
      step: 1
    };

    return {
        all: function() {
            return filters;
        },
        get: function(key) {
            return filters[key];
        },
        set: function(key, val) {
            filters[key] = val;
        }
    }
  });
