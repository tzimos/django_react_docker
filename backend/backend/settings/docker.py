"""
.. module:: backend.settings.docker
   :synopsis: Docker settings.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from backend.settings.base import *

domain_name = os.environ.get('DOMAIN_NAME', 'localhost')

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

    ALLOWED_HOSTS = ['localhost',]

else:
    ALLOWED_HOSTS += ['www.' + domain_name, 'backend']
    REST_FRAMEWORK = {
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework.renderers.JSONRenderer',
        )
    }

    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'file': {
                'level': 'INFO',
                'class': 'logging.FileHandler',
                'filename': 'log/debug_django.log',
            },
        },
        'loggers': {
            'django': {
                'handlers': ['file'],
                'level': 'INFO',
                'propagate': True,
            },
        },
    }

CORS_ORIGIN_WHITELIST = (
    domain_name + ':8080',
    domain_name + ':8000',
)

