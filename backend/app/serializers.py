from rest_framework import serializers
from .models import Task, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email"]
        
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User(
            username=validated_data["username"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

class TaskListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name", "category", "user", "isDone", "date"]
        read_only_fields = ["user"]

    def validate(self, data):
        name = data.get('name')
        date = data.get('date')
        
        if Task.objects.filter(name=name, date=date).exists():
            raise serializers.ValidationError({"name_date": "Task with this name and date already exists."})
        return data