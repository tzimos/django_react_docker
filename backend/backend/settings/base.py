"""
.. module:: backend.settings.base
   :synopsis: General base settings. this module
              is getting inherited by any other module
              depending the environment and can be overriden.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

import os
from datetime import timedelta

SETTINGS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SETTINGS_DIR, '../../api'))
BASE_DIR = os.path.abspath(os.path.join(PROJECT_DIR, '../../'))

SECRET_KEY = 'qx6q_5^8ai#z6xw(k%sh2+x5we39@)4*tr$w&ukgi&mv=)*s15'

DEBUG = True
DEBUG_TOOLBAR = False

ALLOWED_HOSTS = []

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',

	# Project apps
	'api',
	'authentication',
	'tasks',

	# Third party apps
	'rest_framework',
	'corsheaders'

]

MIDDLEWARE = [
	'corsheaders.middleware.CorsMiddleware',
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'corsheaders.middleware.CorsPostCsrfMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [
			os.path.join(BASE_DIR, 'templates')
		],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	}
}

AUTH_USER_MODEL = 'authentication.User'

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

STANDARD_DATETIME_FRMT = "%d-%B-%Y %H:%M:%S"

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'backend/static_collection')

# Api settings
REST_FRAMEWORK = {
	"DATE_INPUT_FORMATS": ["%d-%m-%Y"],
	'DEFAULT_PERMISSION_CLASSES': (
		# By default we set everything to admin,
		#   then open endpoints on a case-by-case basis
		'rest_framework.permissions.IsAdminUser',
	),
	'TEST_REQUEST_RENDERER_CLASSES': (
		'rest_framework.renderers.MultiPartRenderer',
		'rest_framework.renderers.JSONRenderer',
		'rest_framework.renderers.TemplateHTMLRenderer'
	),
	'DEFAULT_AUTHENTICATION_CLASSES': (
		'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
		'rest_framework.authentication.SessionAuthentication',
	),
	'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
	'PAGE_SIZE': 100,
}

CORS_ORIGIN_ALLOW_ALL = False

JWT_AUTH = {
	'JWT_RESPONSE_PAYLOAD_HANDLER': 'api.authentication.utils.my_jwt_response_handler',
	'JWT_AUTH_HEADER_PREFIX': 'JWT',
	'JWT_EXPIRATION_DELTA': timedelta(hours=1),
	'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
	'JWT_ALLOW_REFRESH': True,
}
