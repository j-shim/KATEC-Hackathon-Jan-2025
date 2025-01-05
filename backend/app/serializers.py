from rest_framework import serializers
from .models import Task

class TaskListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name", "category", "user", "isDone", "date"]
        read_only_fields = ["user"]
