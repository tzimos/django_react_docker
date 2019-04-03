"""
.. module:: backend.wsgi
   :synopsis: The wsgi definition module.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.docker')

application = get_wsgi_application()
