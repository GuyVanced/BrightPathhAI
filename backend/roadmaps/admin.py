from django.contrib import admin
from .models import RoadmapCategory, LearningResource, RoadmapNode, NodeResource, UserRoadmap

@admin.register(RoadmapCategory)
class RoadmapCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

@admin.register(LearningResource)
class LearningResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'duration', 'created_at')
    list_filter = ('resource_type',)
    search_fields = ('title', 'description')

class NodeResourceInline(admin.TabularInline):
    model = NodeResource
    extra = 1

@admin.register(RoadmapNode)
class RoadmapNodeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'estimated_hours', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description')
    filter_horizontal = ('prerequisites',)
    inlines = [NodeResourceInline]

@admin.register(UserRoadmap)
class UserRoadmapAdmin(admin.ModelAdmin):
    list_display = ('user', 'node', 'status', 'progress', 'started_at', 'completed_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'node__title')
    raw_id_fields = ('user', 'node')
