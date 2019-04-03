"""
.. module:: api.tasks.urls
   :synopsis: Tasks api urls.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""
from django.urls import path
from api.tasks.views import (TasksListAllView, TasksListPrivateView,
                             TaskMarkAsDone, TaskEdit,
                             TaskCreate, TaskDelete)

app_name = 'tasks'

urlpatterns = [
	path('all-public/', TasksListAllView.as_view()),
	path('all-private/', TasksListPrivateView.as_view()),
	path('mark-as-done/', TaskMarkAsDone.as_view()),
	path('edit/', TaskEdit.as_view()),
	path('create/', TaskCreate.as_view()),
	path('delete/', TaskDelete.as_view()),
]
