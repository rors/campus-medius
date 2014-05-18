from tastypie.resources import ModelResource

from events.models import Event
from campusmedius.utils.cors import CORSResource

class EventResource(CORSResource,ModelResource):
    class Meta:
        queryset = Event.objects.all()
        resource_name = 'event'

