from rest_framework.response import Response
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
from django.http import JsonResponse
from .chatbot import ask_chatbot  # Import your function

class ChatbotView(APIView):

 def get(self, request):
        text = request.GET.get('data')
        print(text)
        if text:
            response = ask_chatbot(text)
            print("response", response)
            return Response(response)
        return JsonResponse({"error": "No text provided"}, status=400)

