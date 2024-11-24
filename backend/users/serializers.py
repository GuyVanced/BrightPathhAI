"""
User-related serializers.
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserRoadmapProgress

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user model.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'bio', 'expertise_level', 
                 'interests', 'completed_roadmaps', 'current_roadmaps')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class UserProgressSerializer(serializers.ModelSerializer):
    """
    Serializer for user progress.
    """
    username = serializers.CharField(source='user.username', read_only=True)
    roadmap_title = serializers.CharField(source='roadmap_node.title', read_only=True)

    class Meta:
        model = UserRoadmapProgress
        fields = ('id', 'username', 'roadmap_node', 'roadmap_title', 'progress',
                 'started_at', 'last_activity', 'completed', 'notes')
        read_only_fields = ('id', 'username', 'roadmap_title', 'started_at', 
                          'last_activity')
