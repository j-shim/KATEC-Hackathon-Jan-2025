from django.urls import path
from .views import TaskListCreateView, TaskDetailView, UserCreateView, UserLoginView, UserLogoutView, UserRetrieveUpdateDeleteView, CSRFTokenView

urlpatterns = [
    path("api/tasks/", TaskListCreateView.as_view(), name="task-list"),
    path("api/tasks/<int:pk>/", TaskDetailView.as_view(), name="task-detail"),
    # User APIs
    path("api/users/", UserCreateView.as_view(), name="user-create"),
    path("api/users/login/", UserLoginView.as_view(), name="user-login"),
    path("api/users/logout/", UserLogoutView.as_view(), name="user-logout"),
    path("api/users/current/", UserRetrieveUpdateDeleteView.as_view(), name="user-retreive-update-delete"),
    path("api/csrf-token/", CSRFTokenView.as_view(), name="csrf-token"),
]
