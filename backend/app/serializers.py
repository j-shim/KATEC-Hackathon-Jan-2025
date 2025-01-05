from rest_framework import serializers
from .models import Task
import datetime

class TaskSerializer(serializers.ModelSerializer):
    date = serializers.DateField(default=datetime.date.today)

    class Meta:
        model = Task
        fields = ['id', 'name', 'category', 'user', 'isDone', 'date']
        read_only_fields = ['user']
