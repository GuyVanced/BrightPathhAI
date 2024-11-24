"""
Shared mixins used across the project.
"""

from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from .utils import format_error_response

class ValidateSerializerMixin:
    """
    Mixin to provide serializer validation methods.
    """
    def validate_serializer(self, serializer):
        if not serializer.is_valid():
            return format_error_response(
                serializer.errors,
                status.HTTP_400_BAD_REQUEST
            )
        return None

class LoggingMixin:
    """
    Mixin to provide logging functionality.
    """
    def log_error(self, error_message, exc=None):
        """Log an error with optional exception details."""
        if exc:
            self.logger.error(f"{error_message}: {str(exc)}")
        else:
            self.logger.error(error_message)

    def log_info(self, message):
        """Log an info message."""
        self.logger.info(message)

class ModelValidationMixin:
    """
    Mixin to provide model validation methods.
    """
    def validate_unique_fields(self, model_class, fields_dict, exclude_id=None):
        """
        Validate that the given fields are unique in the model.
        """
        try:
            query = model_class.objects.filter(**fields_dict)
            if exclude_id:
                query = query.exclude(id=exclude_id)
            if query.exists():
                raise ValidationError(
                    f"{model_class.__name__} with these fields already exists"
                )
        except Exception as e:
            raise ValidationError(str(e))
