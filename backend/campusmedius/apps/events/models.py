from django.contrib.gis.db import models # from django.db import models
from django.template.defaultfilters import slugify

from tinymce import models as tinymce_models

class BaseModel(models.Model):
    class Meta:
        abstract = True

    created_at  = models.DateTimeField(auto_now_add=True,editable=False)
    updated_at  = models.DateTimeField(auto_now=True,editable=False)
    slug        = models.SlugField(editable=False)

    def save (self, *args, **kwargs):
        # todo: need to change the slug if ever the object is changed
        # and the unicode representation changes
        if not hasattr(self,"slug") or not self.slug:
            self.slug = slugify( self.__unicode__() )[:50]

        super(BaseModel,self).save(*args,**kwargs)


political_groups = ( 
    ('bourgeois', 'Bourgeois'),
    ('austrofascist', 'Austrofascist'),
    ('national-socialist','National Socialist'),
    ('socialist-communist','Socialist and Communist'),
    )

mediality_modes = (
    ('sovereign', 'Sovereign Sign'),
    ('disciplinary', 'Disciplinary Gaze'),
    ('controlled', 'Controlled Transmission'),
)

class Event(BaseModel):
    title = models.CharField(max_length=1000,unique=True, verbose_name="Event Title");

    icon = models.ImageField(upload_to="event-icons",null=True, blank=True, verbose_name="Event Icon")

    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)

    location = models.PointField(null=True)

    political_affiliation = models.CharField(choices=political_groups, max_length=50, null=False, blank=True)
    mediality_mode = models.CharField(choices=mediality_modes, max_length=50, null=False, blank=True)

    description = tinymce_models.HTMLField()

    media_objects = models.ManyToManyField("MediaObject",blank=True) #,through="EventMediaObject")

    def __unicode__(self):
        return self.title

# class EventMediaObject(BaseModel):
#     pass

class MediaObject(BaseModel):
    title = models.CharField(max_length=1000,unique=True, verbose_name="Media Object Title");

    caption = tinymce_models.HTMLField()

    def type(self):
        try:
            self.image
            return "Image"
        except MediaObject.DoesNotExist:
            pass
        try:
            self.video
            return "Video"
        except MediaObject.DoesNotExist:
            pass
        try:
            self.sound
            return "Sound"
        except MediaObject.DoesNotExist:
            pass

    def __unicode__(self):
        return "%s (%s)" % ( self.title, self.type() )

class Image(MediaObject):
    image = models.ImageField(upload_to="images")

class Video(MediaObject):
    video = models.FileField(upload_to="videos")

class Sound(MediaObject):
    sound = models.FileField(upload_to="sounds")

