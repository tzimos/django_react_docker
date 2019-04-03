"""
.. module:: api.task.views.tasks_all
   :synopsis: Returns all private tasks.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.db.models import Q
from api.tasks.views import TasksListBaseView


class TasksListPrivateView(TasksListBaseView):

    def get_query(self, request):
        return Q(is_public=False) & Q(author=request.user)
