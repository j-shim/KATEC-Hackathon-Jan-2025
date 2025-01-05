from rest_framework import generics
from .models import Task
from .serializers import TaskListCreateSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskListCreateSerializer

    def get_queryset(self):
        user = self.request.user
        date = self.request.query_params.get("date")
        date_gte = self.request.query_params.get("date__gte")
        date_lte = self.request.query_params.get("date__lte")
        isDone = self.request.query_params.get("isDone")
        category = self.request.query_params.get("category")

        queryset = Task.objects.filter(user=user)

        if date:
            queryset = queryset.filter(date=date)
        if date_gte:
            queryset = queryset.filter(date__gte=date_gte)
        if date_lte:
            queryset = queryset.filter(date__lte=date_lte)
        if isDone:
            queryset = queryset.filter(isDone=isDone)
        if category:
            queryset = queryset.filter(category=category)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListCreateSerializer

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
