from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'exercises'

router = DefaultRouter()
router.register(r'', views.ExerciseViewSet, basename='exercise')

urlpatterns = [
    path('', include(router.urls)),
]
