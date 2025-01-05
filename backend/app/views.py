from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND
)

from django.contrib.auth import login, authenticate, logout
from .models import Task, User
from .serializers import TaskListCreateSerializer, UserCreateSerializer, UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        serializer.save()
        
@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'CSRF token set'})
    
class UserLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not User.objects.filter(username=username).exists():
            return Response({"error": "user does not exist"}, status=HTTP_404_NOT_FOUND)
        
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Authentication failed"}, status=HTTP_401_UNAUTHORIZED)
        
        login(request, user)
        return Response(UserSerializer(user).data, status=HTTP_200_OK)

class UserLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
    
class UserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

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
