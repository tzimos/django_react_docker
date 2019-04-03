"""
.. module:: api.task.views.task_edit
   :synopsis: Task edit view.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from datetime import datetime

from django.core.exceptions import SuspiciousOperation
from django.utils import timezone
from rest_framework.exceptions import NotFound
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api.tasks.serializers import TaskAllSerializer
from tasks.models import Task


class TaskEdit(APIView):
	authentication_classes = (JSONWebTokenAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, *args, **kwargs):
		data = request.data

		data['due_date'] = datetime.strptime(data.get('due_date')[:10], '%Y-%m-%d').date()

		user = request.user
		try:
			task_id = int(data.get('task_id'))
		except (ValueError, TypeError):
			raise SuspiciousOperation

		try:
			task = Task.objects.get(id=task_id)
		except Task.DoesNotExist:
			raise NotFound

		for key, val in data.items():
			setattr(task, key, val)

		task.modified = timezone.now()
		task.modified_by = user

		task.save()

		data = TaskAllSerializer(task).data
		return Response(data=data, status=status.HTTP_200_OK)
