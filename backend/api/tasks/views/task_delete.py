"""
.. module:: api.task.views.task_delete
   :synopsis: Task delete view.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""
from django.core.exceptions import SuspiciousOperation
from django.http import HttpResponseBadRequest
from rest_framework.exceptions import NotFound
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from tasks.models import Task


class TaskDelete(APIView):
	authentication_classes = (JSONWebTokenAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, *args, **kwargs):
		task_id = request.data.get('task_id')
		user = request.user
		try:
			task_id = int(task_id)
		except (ValueError, TypeError):
			raise SuspiciousOperation

		try:
			task = Task.objects.get(id=task_id)
		except Task.DoesNotExist:
			raise NotFound
		if user != task.author:
			return HttpResponseBadRequest()

		task.delete()

		return Response(status=status.HTTP_200_OK)
