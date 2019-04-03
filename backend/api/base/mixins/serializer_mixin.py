"""
.. module:: api.base.mixins.serializer_mixin
   :synopsis: Class which can be used to optimize the look up
              overhead on the database when serializing.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""


class SerializerQueryOptimizationMixin():

	@classmethod
	def setup_eager_loading(cls, queryset, *fields):
		"""

		:param queryset: The queryset that is provided from the
						 get_queryset method at viewsets
		:param fields: fields that will be prefetched. They point
					   to foreign keys or m2m relations.
		:return: queryset.
		"""
		return queryset.prefetch_related(*fields)
