"""
.. module:: api.authentication.utils.response_payload_handler
   :synopsis: Response payload handler. It is used in
              User serializer with token.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from api.authentication.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None):
	return {
		'token': token,
		'user': UserSerializer(user, context={'request': request}).data
	}
