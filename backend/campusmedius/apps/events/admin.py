from django.contrib.gis import admin

from events.models import *


class CMGeoAdmin(admin.OSMGeoAdmin):
    # default_lon = 1847901.70641
    # default_lat = 5367902.08877
    default_zoom = 12

    default_lon = 1827798.76797
    default_lat = 6142820.68139


class EventAdmin(CMGeoAdmin):

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

