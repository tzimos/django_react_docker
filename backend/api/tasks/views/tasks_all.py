"""
.. module:: api.task.views.tasks_all
   :synopsis: Returns all tasks.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.db.models import Q
from api.tasks.views.task_base import TasksListBaseView


class TasksListAllView(TasksListBaseView):

    def get_query(self, request):
        return Q(is_public=True) | Q(author=request.user)
