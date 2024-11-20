from rest_framework.response import Response
from .models import TaskType
from .serializers import TaskSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import datetime
from rest_framework.authtoken.models import Token
# from django.contrib.auth.hashers import check_password
import secrets
import threading

TOKEN_LENGTH = 256


class TaskTypeView(APIView):
    def get(self, request):
        queryset = TaskType.objects.get()
        serializer = TaskSerializer(queryset)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        data = request.data
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=201)
        return Response(serializer.errors, status=400)
