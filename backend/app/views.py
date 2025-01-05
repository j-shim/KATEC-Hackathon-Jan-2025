from rest_framework import generics

from .models import Task
from .serializers import TaskListCreateSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskListCreateSerializer

    def get_queryset(self):
        user = self.request.user
        date = self.request.query_params.get("date")
        if date:
            return Task.objects.filter(user=user, date=date)
        return Task.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
