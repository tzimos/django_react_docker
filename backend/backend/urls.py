"""
.. module:: backend.urls
   :synopsis: Project-wide urls module.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
	path('backend/admin/', admin.site.urls),
	path('backend/api/', include('api.urls', namespace='api')),
]

if settings.DEBUG:
	urlpatterns += [
		path('backend/api-auth/', include('rest_framework.urls', namespace='rest_framework')),

	]

if settings.DEBUG_TOOLBAR:
	import debug_toolbar

	urlpatterns = [
		              path('backend/__debug__/', include(debug_toolbar.urls)),
	              ] + urlpatterns
