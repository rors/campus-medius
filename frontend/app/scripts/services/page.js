'use strict';

angular.module('CampusMediusApp')
  .service('PageService', function PageService($window, $http, API_ENDPOINT_PAGES) {
    var pages = [];
    var pagesPromise;

    return {
        getPage: function(slug) {
            if(pagesPromise) {
                return pagesPromise;
            }
            var request = $http({
                method: 'GET',
                cache: true,
                url: API_ENDPOINT_PAGES
            });
            pagesPromise = request.then(function(response) {
                pages = response.data.objects;
                return getPageBySlug(slug);
            });
            return pagesPromise;
        }
    };

    function getPageBySlug(slug) {
        for(var i=0; i<pages.length; i++) {
            if(pages[i].slug === slug) {
                return pages[i];
            }
        }
    }
  });
