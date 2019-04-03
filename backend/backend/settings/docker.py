"""
.. module:: backend.settings.docker
   :synopsis: Docker settings.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from backend.settings.base import *

ALLOWED_HOSTS += ['localhost', 'backend']
DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql_psycopg2',
		'NAME': 'postgres',
		'USER': 'postgres',
		'PASSWORD': '{uS7M:Wg=(c@UuEg',
		'HOST': 'django_react_db',
	}
}

DEBUG = bool(int(os.environ['DEBUG']))

if DEBUG:
	INSTALLED_APPS += [
		'django_extensions',
	]

	if DEBUG_TOOLBAR:
		INSTALLED_APPS += [
			'debug_toolbar',
		]

		MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]
		INTERNAL_IPS = ['127.0.0.1', ]

CORS_ORIGIN_WHITELIST = (
	'localhost:8080',
	'localhost:8000',
	'http://localhost:8000'
)
