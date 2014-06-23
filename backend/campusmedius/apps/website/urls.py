
from django.conf.urls import patterns, url, include
from website.api import PageResource, TeamMemberResource

page_resource = PageResource()
teammember_resource = TeamMemberResource()

urlpatterns = patterns('',
    (r'pages/', include(page_resource.urls)),
    (r'teammembers/', include(teammember_resource.urls)),
)
