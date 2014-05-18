from tastypie.resources import ModelResource

from events.models import Event
from campusmedius.utils.cors import CORSResource

class EventResource(CORSResource,ModelResource):
    class Meta:
        queryset = Event.objects.all()
        resource_name = 'event'

        excludes = [ 'location', ]

    def dehydrate(self, bundle):
        bundle.data['lat'] = bundle.obj.location.y
        bundle.data['lng'] = bundle.obj.location.x
        return bundle
