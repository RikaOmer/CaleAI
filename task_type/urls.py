from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaskTypeView

urlpatterns = [
    path("", TaskTypeView.as_view(), name='task_type'),
    # path("<str:token>", UserView.as_view(), name='user_by_token'),
    # path("login/", LoginView.as_view(), name='login'),
]
