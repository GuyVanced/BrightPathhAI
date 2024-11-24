from rest_framework import serializers
from .models import RoadmapCategory, LearningResource, RoadmapNode, UserRoadmap

class RoadmapCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapCategory
        fields = ['id', 'name', 'description']

class LearningResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningResource
        fields = ['id', 'title', 'description', 'resource_type', 'url', 'duration']

class RoadmapNodeSerializer(serializers.ModelSerializer):
    prerequisites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    resources = LearningResourceSerializer(many=True, read_only=True)
    category = RoadmapCategorySerializer(read_only=True)

    class Meta:
        model = RoadmapNode
        fields = [
            'id', 'title', 'description', 'category', 
            'prerequisites', 'resources', 'estimated_hours'
        ]

class UserRoadmapSerializer(serializers.ModelSerializer):
    node = RoadmapNodeSerializer(read_only=True)
    
    class Meta:
        model = UserRoadmap
        fields = [
            'id', 'node', 'status', 'progress', 
            'started_at', 'completed_at'
        ]
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
