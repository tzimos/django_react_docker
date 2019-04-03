"""
.. module:: backend.api.authentication.urls
   :synopsis: Urls module for authentication api.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from api.authentication.views import current_user

app_name = 'authentication'

urlpatterns = [
	path('current_user/', current_user),
	path('token-auth/', obtain_jwt_token),
	path('refresh-token/', refresh_jwt_token),
]
