from django.urls import path

from .views import TaskListCreateView

urlpatterns = [
    path("api/tasks/", TaskListCreateView.as_view(), name="task-list"),
]
