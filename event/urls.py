from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EventView

urlpatterns = [
    path("", EventView.as_view(), name='event')
]
