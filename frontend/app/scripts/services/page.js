'use strict';

angular.module('CampusMediusApp')
  .service('PageService', function Actorservice($window, $http, ICON_SIZES, STATIC_URL, API_ENDPOINT_PAGES) {
    var pages = [];
    var pagesPromise;

    return {
        getPage: function(slug) {
            var request = $http({
                method: 'GET',
                cache: true,
                url: API_ENDPOINT_PAGES
            });

            return request.then(function(response) {
                pages = response.data.objects;
                return getPageBySlug(slug);
            });
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
