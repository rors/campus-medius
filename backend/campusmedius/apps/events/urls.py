
from django.conf.urls import patterns, url, include
from events.api import EventResource

event_resource = EventResource()

urlpatterns = patterns('',
    (r'', include(event_resource.urls)),
)
