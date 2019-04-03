"""
.. module:: api.task.views.__init__
   :synopsis: Package initialization.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from api.tasks.views.task_base import TasksListBaseView
from api.tasks.views.tasks_all import TasksListAllView
from api.tasks.views.tasks_private import TasksListPrivateView
from api.tasks.views.task_mark_as_done import TaskMarkAsDone
from api.tasks.views.task_edit import TaskEdit
from api.tasks.views.task_create import TaskCreate
from api.tasks.views.task_delete import TaskDelete

__all__ = [
	'TasksListBaseView',
	'TasksListAllView',
	'TasksListPrivateView',
	'TaskMarkAsDone',
	'TaskEdit',
	'TaskCreate',
	'TaskDelete',
]
