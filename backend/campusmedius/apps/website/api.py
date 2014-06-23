from tastypie.resources import ModelResource
from tastypie import fields

from website.models import Page, TeamMember
from campusmedius.utils.cors import CORSResource


class PageResource(CORSResource,ModelResource):
    class Meta:
        queryset = Page.objects.all()
        resource_name = 'page'

        excludes = [ 'id', 'created_at', 'updated_at', ]

class TeamMemberResource(CORSResource,ModelResource):
    class Meta:
        queryset = TeamMember.objects.all()
        resource_name = 'teammember'

        excludes = [ 'id', 'created_at', 'updated_at', ]
