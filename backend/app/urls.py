from django.urls import path
from .views import TaskCreateView, TaskListView

urlpatterns = [
    path('api/<str:user>/create/', TaskCreateView.as_view(), name='task-create'),
    path('api/<str:user>/', TaskListView.as_view(), name='task-list'),
]
