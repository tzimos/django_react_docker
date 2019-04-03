"""
.. module:: tasks.admin.tasks
   :synopsis: The task admin module.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from django.contrib import admin

from tasks.models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
	pass
