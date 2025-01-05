from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['user']
        date = self.request.query_params.get('date')
        if date:
            return Task.objects.filter(user__username=user, date=date)
        return Task.objects.filter(user__username=user)
