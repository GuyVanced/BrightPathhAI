from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

class ExerciseViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request):
        return Response({"message": "List of exercises"})
    
    def retrieve(self, request, pk=None):
        return Response({"message": f"Exercise {pk} details"})
