"""
Shared utility functions used across the project.
"""

import logging
from typing import Any, Dict, List, Optional
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)

def handle_api_error(func):
    """
    Decorator to handle API exceptions and provide consistent error responses.
    """
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Error in {func.__name__}: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    return wrapper

def validate_required_fields(data: Dict[str, Any], required_fields: List[str]) -> Optional[Response]:
    """
    Validate that all required fields are present in the data.
    Returns None if valid, or a Response object with error details if invalid.
    """
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return Response(
            {'error': f"Missing required fields: {', '.join(missing_fields)}"},
            status=status.HTTP_400_BAD_REQUEST
        )
    return None

def format_error_response(message: str, status_code: int = status.HTTP_400_BAD_REQUEST) -> Response:
    """
    Create a formatted error response.
    """
    return Response({'error': message}, status=status_code)

def format_success_response(data: Any, message: str = "Success") -> Response:
    """
    Create a formatted success response.
    """
    return Response({
        'status': 'success',
        'message': message,
        'data': data
    }, status=status.HTTP_200_OK)
