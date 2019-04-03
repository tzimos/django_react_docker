"""
.. module:: backend.settings.docker
   :synopsis: Local settings.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from backend.settings.base import *

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql_psycopg2',
		'NAME': 'django_react',
		'USER': 'ptzimos',
		'PASSWORD': '123456',
		'HOST': 'localhost',
	}
}

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
)
