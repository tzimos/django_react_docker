"""
.. module:: api.tasks.sderializers.tasks_all
   :synopsis: Task serializer.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.conf import settings
from rest_framework import serializers

from api.authentication.serializers import UserSerializer
from tasks.models import Task


class TaskAllSerializer(serializers.ModelSerializer):
    done_by = UserSerializer(read_only=True)
    author = UserSerializer(read_only=True)
    created = serializers.DateTimeField(format=settings.STANDARD_DATETIME_FRMT)
    modified = serializers.DateTimeField(format=settings.STANDARD_DATETIME_FRMT)

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'is_public',
            'author',
            'details',
            'created',
            'modified',
            'done',
            'done_by',
            'due_date',
        ]


