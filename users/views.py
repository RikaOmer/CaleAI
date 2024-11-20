from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import datetime
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
import secrets
import threading

TOKEN_LENGTH = 256


class UserView(APIView):
    def get(self, request, token=None):
        queryset = User.objects.get(token=token)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

    def post(self, request, token=None):
        print(request.data)
        data = request.data
        data["morning_start_time"] = datetime.fromisoformat(
            str(data["morning_start_time"]).replace("Z", "")).time()
        data["day_end_time"] = datetime.fromisoformat(
            str(data["day_end_time"]).replace("Z", "")).time()
        token = secrets.token_urlsafe(TOKEN_LENGTH)
        data["token"] = token
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"token": token}, status=201)
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'message': 'Both email and password are required'}, status=400)
        print(email, password)
        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                token = secrets.token_urlsafe(TOKEN_LENGTH)
                threading.Thread(target=self.update_token,
                                 args=(user, token)).start()
                return Response({'token': token}, status=200)
            else:
                return Response({'message': 'Login failed'}, status=401)
        except User.DoesNotExist:
            return Response({'message': 'Login failed'}, status=401)

    @staticmethod
    def update_token(user: User, token):
        user.token = token
        user.save()
        return user
