"""
.. module:: authentication.management.command.create_admin_user
   :synopsis: Custom command that creates a superuser.
              It is used in when it is starts the container
              service in order to give an initial superuser if
              it doesn't exist.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
	help = 'Creates a superuser'

	def handle(self, *args, **kwargs):
		email = 'admin@admin.com'
		user = None
		try:
			user = get_user_model().objects.get(email=email)
		except get_user_model().DoesNotExist:
			pass

		if user:
			return

		user = get_user_model().objects.create_superuser(
			email=email,
			password='Adminr00t'
		)
		if user:
			self.stdout.write('Created superuser {}'.format(user.email))
		else:
			self.stdout.write(
				'Something went wrong while trying to create a superuser.'
				' Please try again'
			)
