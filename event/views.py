from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import datetime
from rest_framework.authtoken.models import Token
# from django.contrib.auth.hashers import check_password
import secrets
import threading
from users.models import User
from django.http.response import JsonResponse
import json
from task.models import Task
TOKEN_LENGTH = 256


class EventView(APIView):
    def get(self, request):
        date = request.query_params.get('date')
        token = request.META.get('HTTP_AUTHORIZATION')
        try:
            user = User.objects.get(token=token)
        except:
            return Response(status=401)
        print(date)
        events = Event.objects.filter(date=date, user_id=user).order_by('from_time')
        events = [event.to_json() for event in events]
        print(events)
        return JsonResponse (events, safe=False)

    def post(self, request):
        data = request.date
        token = request.META.get('HTTP_AUTHORIZATION')
        print(data)
        print(token)
        user = User.objects.get(token=token)

        print(request.data)
        data = request.data
        data["from_time"] = datetime.fromisoformat(
            str(data["from_time"]).replace("Z", "")).time()
        data["to_time"] = datetime.fromisoformat(
            str(data["to_time"]).replace("Z", "")).time()
        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=201)
        return Response(serializer.errors, status=400)

    def put(self, request):
        try:
            data = request.data
            print(data)
            token = request.META.get('HTTP_AUTHORIZATION')
            user = User.objects.get(token=token)
            event = Event.objects.get(id=data["id"], user_id=user)
            data["from_time"] = str(data["from_time"])
            data["to_time"] = str(data["to_time"])
            data["is_constant"] = True
            data["user_id"] = user.id
            data["task_id"] = data["task_id"]["id"]
            serializer = EventSerializer(event, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=200)
            print(serializer.errors)
            return Response(serializer.errors, status=400)
        except Exception as e:
            print(e)
            return Response(status=400)
    
    def delete(self, request):
        data = request.data
        print(data)
        token = request.META.get('HTTP_AUTHORIZATION')
        user = User.objects.get(token=token)
        event = Event.objects.get(id=data["id"], user_id=user)
        event.delete()
        return Response(status=200)