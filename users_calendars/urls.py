from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UsersCalendarsView

urlpatterns = [
    path("", UsersCalendarsView.as_view(), name='users_calendars'),
    # path("<str:token>", UserView.as_view(), name='user_by_token'),
    # path("login/", LoginView.as_view(), name='login'),
]
