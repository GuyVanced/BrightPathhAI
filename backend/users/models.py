"""
User-related models.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model with additional fields.
    """
    # Profile fields
    bio = models.TextField(max_length=500, blank=True)
    expertise_level = models.CharField(
        max_length=20,
        choices=[
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced')
        ],
        default='beginner'
    )
    interests = models.JSONField(default=list, blank=True)
    
    # Learning progress
    completed_roadmaps = models.ManyToManyField(
        'roadmaps.RoadmapNode',
        related_name='completed_by_users',
        blank=True
    )
    current_roadmaps = models.ManyToManyField(
        'roadmaps.RoadmapNode',
        through='UserRoadmapProgress',
        related_name='learning_users',
        blank=True
    )

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username

class UserRoadmapProgress(models.Model):
    """
    Track user progress through roadmap nodes.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roadmap_node = models.ForeignKey('roadmaps.RoadmapNode', on_delete=models.CASCADE)
    progress = models.IntegerField(default=0)  # 0-100
    started_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'roadmap_node')
        ordering = ['-last_activity']

    def __str__(self):
        return f"{self.user.username} - {self.roadmap_node.title}"
