from tastypie.resources import ModelResource
from tastypie import fields

from events.models import Event, MediaObject
from campusmedius.utils.cors import CORSResource


class MediaObjectResource(CORSResource,ModelResource):
    class Meta:
        queryset = MediaObject.objects.all()
        resource_name = 'medobj'

        excludes = [ 'id', 'created_at', 'updated_at', ]

    def dehydrate(self, bundle):
        bundle.data['type'] = bundle.obj.type
        bundle.data['url'] = bundle.obj.url
        return bundle

class EventResource(CORSResource,ModelResource):
    class Meta:
        queryset = Event.objects.order_by('start_time')
        resource_name = 'event'

        excludes = [ 'id', 'location', 'created_at', 'updated_at', ]

    media_objects = fields.ToManyField(MediaObjectResource, 'media_objects', full=True)

    def dehydrate(self, bundle):
        bundle.data['lat'] = bundle.obj.location.y
        bundle.data['lng'] = bundle.obj.location.x
        return bundle

