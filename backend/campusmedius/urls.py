from django.conf import settings
from django.conf.urls import patterns, url, include

from django.contrib.gis import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^{{ project_name }}/', include('{{ project_name }}.foo.urls')),

    (r'^admin/', include(admin.site.urls)),

    (r'^tinymce/', include('tinymce.urls')),

    (r'^', include('events.urls')),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.MEDIA_ROOT}),
    )

