from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import RoadmapCategory, LearningResource, RoadmapNode, UserRoadmap
from .serializers import (
    RoadmapCategorySerializer, 
    LearningResourceSerializer,
    RoadmapNodeSerializer,
    UserRoadmapSerializer
)

class RoadmapCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RoadmapCategory.objects.all()
    serializer_class = RoadmapCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LearningResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LearningResource.objects.all()
    serializer_class = LearningResourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = LearningResource.objects.all()
        resource_type = self.request.query_params.get('type', None)
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        return queryset

class RoadmapNodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RoadmapNode.objects.all()
    serializer_class = RoadmapNodeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = RoadmapNode.objects.all()
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

    @action(detail=True, methods=['get'])
    def prerequisites(self, request, pk=None):
        node = self.get_object()
        prerequisites = node.prerequisites.all()
        serializer = self.get_serializer(prerequisites, many=True)
        return Response(serializer.data)

class UserRoadmapViewSet(viewsets.ModelViewSet):
    serializer_class = UserRoadmapSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserRoadmap.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def update_progress(self, request, pk=None):
        user_roadmap = self.get_object()
        progress = request.data.get('progress', None)
        
        if progress is None:
            return Response(
                {'error': 'Progress value is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            progress = int(progress)
            if not (0 <= progress <= 100):
                raise ValueError
        except ValueError:
            return Response(
                {'error': 'Progress must be an integer between 0 and 100'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        user_roadmap.progress = progress
        user_roadmap.save()
        serializer = self.get_serializer(user_roadmap)
        return Response(serializer.data)
