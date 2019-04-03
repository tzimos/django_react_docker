"""
.. module:: api.task.views.task_base
   :synopsis: Base task class that leaves the actual quering
              for the child class.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api.tasks.serializers import TaskAllSerializer
from tasks.models import Task


class TasksListBaseView(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        query = self.get_query(request)
        queryset = Task.objects.filter(query)
        serializer = TaskAllSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_query(self,request):
        raise NotImplementedError
