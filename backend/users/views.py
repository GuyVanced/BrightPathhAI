"""
User-related views and viewsets.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserProgressSerializer
from .models import UserRoadmapProgress
from shared.utils import handle_api_error
from shared.mixins import ValidateSerializerMixin, LoggingMixin

User = get_user_model()

class UserViewSet(ValidateSerializerMixin, LoggingMixin, viewsets.ModelViewSet):
    """
    ViewSet for user management.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    @handle_api_error
    def progress(self, request, pk=None):
        """
        Get user's learning progress.
        """
        user = self.get_object()
        progress = UserRoadmapProgress.objects.filter(user=user)
        serializer = UserProgressSerializer(progress, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    @handle_api_error
    def update_progress(self, request, pk=None):
        """
        Update progress for a specific roadmap node.
        """
        user = self.get_object()
        serializer = UserProgressSerializer(data=request.data)
        
        if error_response := self.validate_serializer(serializer):
            return error_response
        
        progress, created = UserRoadmapProgress.objects.update_or_create(
            user=user,
            roadmap_node_id=request.data['roadmap_node'],
            defaults={
                'progress': request.data['progress'],
                'completed': request.data.get('completed', False),
                'notes': request.data.get('notes', '')
            }
        )
        
        return Response(
            UserProgressSerializer(progress).data,
            status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED
        )
