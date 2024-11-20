from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaskView

urlpatterns = [
    path("", TaskView.as_view(), name='task'),
    # path("<str:token>", UserView.as_view(), name='user_by_token'),
    # path("login/", LoginView.as_view(), name='login'),
]
