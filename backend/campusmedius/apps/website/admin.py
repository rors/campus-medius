from django import forms
from django.contrib import admin

from tinymce.widgets import TinyMCE

from website.models import *


class PageAdminForm(forms.ModelForm):
    class Meta:
        model = Page
    body = forms.CharField(widget=TinyMCE(attrs={'cols': 90, 'rows': 40}))

class PageAdmin(admin.ModelAdmin):

    form = PageAdminForm

admin.site.register(Page,PageAdmin)
admin.site.register(TeamMember)

