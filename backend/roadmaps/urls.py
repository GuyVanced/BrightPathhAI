from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.RoadmapCategoryViewSet)
router.register(r'resources', views.LearningResourceViewSet)
router.register(r'nodes', views.RoadmapNodeViewSet)
router.register(r'user-roadmaps', views.UserRoadmapViewSet, basename='user-roadmap')

urlpatterns = [
    path('', include(router.urls)),
]
