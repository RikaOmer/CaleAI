from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CalendarView
from .generator.main import generate
# router = DefaultRouter()
# router.register("<int:user_id>", CalendarView, basename='calendars')
urlpatterns = [
    path('<int:pk>', CalendarView.as_view(), name='calendars'),
    path('', CalendarView.as_view(), name='calendars'),
    path('generate/', generate, name='generate_calendar')
]
