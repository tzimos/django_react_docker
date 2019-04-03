"""
.. module:: api.task.views.task_mark_as_done
   :synopsis: View to mark as done a task.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""


from django.core.exceptions import SuspiciousOperation
from rest_framework.exceptions import NotFound
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api.tasks.serializers import TaskAllSerializer
from tasks.models import Task


class TaskMarkAsDone(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request,*args,**kwargs):
        task_id = request.data.get('id')
        user = request.user
        try:
            task_id = int(task_id)
        except (ValueError,TypeError):
            raise SuspiciousOperation

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            raise NotFound

        task.done = True
        task.done_by = user
        task.save()
        data = TaskAllSerializer(task).data
        return Response(data,status=status.HTTP_200_OK)
