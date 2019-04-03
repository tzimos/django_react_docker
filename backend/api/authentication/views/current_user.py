"""
.. module:: api.authentication.views.current_user
   :synopsis: Api View that returns the current user's email.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.authentication.serializers import UserSerializer


@api_view(['POST'])
def current_user(request):
	"""
	Determine the current user by their token, and return their data
	"""
	serializer = UserSerializer(request.user)
	return Response(serializer.data)
