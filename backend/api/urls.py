"""
.. module:: api.urls
   :synopsis: Urls for api app.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('auth/',include('api.authentication.urls',namespace='auth')),
    path('tasks/',include('api.tasks.urls',namespace='tasks'))
]
