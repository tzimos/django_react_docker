"""
.. module:: api.authentication.serializers.auth.user
   :synopsis: User serializer.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
	"""The UserSerializer class"""

	class Meta:
		model = User
		fields = ('email',)
