"""
.. module:: api.task.views.task_create
   :synopsis: Task create view.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""
from datetime import datetime

from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api.tasks.serializers import TaskAllSerializer
from tasks.models import Task


class TaskCreate(APIView):
	authentication_classes = (JSONWebTokenAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, *args, **kwargs):
		data = request.data

		data['due_date'] = datetime.strptime(data.get('due_date'), '%Y-%m-%d').date()

		user = request.user

		data.update({
			'modified':timezone.now(),
			'modified_by': user,
			'author': user,
		})

		task = Task.objects.create(**data)

		data = TaskAllSerializer(task).data
		return Response(data=data, status=status.HTTP_200_OK)
