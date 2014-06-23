from django.db import models
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

class Page(BaseModel):

    title = models.CharField(max_length=1000,unique=True, verbose_name="Page Title");

    body = tinymce_models.HTMLField()

    def __unicode__(self):
        return self.title

class TeamMember(BaseModel):

    first_name = models.CharField(max_length=1000,unique=True, verbose_name="First Name");
    last_name = models.CharField(max_length=1000,unique=True, verbose_name="Last Name");

    bio = tinymce_models.HTMLField()

    def __unicode__(self):
        return "%s %s" % ( self.first_name, self.last_name )

    
