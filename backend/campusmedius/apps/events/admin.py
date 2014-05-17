from django.contrib.gis import admin

from events.models import *


# class CMGeoAdmin(admin.OSMGeoAdmin):
#     default_lon = -8232697.21600
#     default_lat = 4976132.48641
#     default_zoom = 10


class EventAdmin(admin.ModelAdmin):

    list_display = ( 'title', 'start_time', 'end_time', 'political_affiliation', 'mediality_mode', )
    list_filter = ( 'political_affiliation', 'mediality_mode', )

    search_fields = ( 'slug', 'title', 'description', )

admin.site.register(Event, EventAdmin)


class ImageAdmin(admin.ModelAdmin):
    list_display = ( 'title', )

    search_fields = ( 'slug', 'title', )
admin.site.register(Image, ImageAdmin)

class VideoAdmin(admin.ModelAdmin):
    list_display = ( 'title', )

    search_fields = ( 'slug', 'title', )
admin.site.register(Video, VideoAdmin)

class SoundAdmin(admin.ModelAdmin):
    list_display = ( 'title', )

    search_fields = ( 'slug', 'title', )
admin.site.register(Sound, SoundAdmin)

