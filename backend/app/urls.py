from django.urls import path
from .views import TaskCreateView

urlpatterns = [
    path('api/<str:user>/', TaskCreateView.as_view(), name='task-create'),
]
