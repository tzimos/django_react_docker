"""
.. module:: api.base.mixins.__init__
   :synopsis: Package initialization.

.. moduleauthor:: Panagiotis Tzimos <tzimoss@gmail.com>
"""

from api.base.mixins.serializer_mixin import SerializerQueryOptimizationMixin

__all__ = [
	'SerializerQueryOptimizationMixin',
]
