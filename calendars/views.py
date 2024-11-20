from rest_framework.response import Response
from rest_framework import status
from .models import Calendar
from .serializers import CalendarSerializer
from rest_framework.views import APIView


class CalendarView(APIView):
    def get(self, request, pk=None):
        """Get a list of calendars for a user or by user ID."""
        if not pk:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="User ID is required")
        calendars = Calendar.objects.filter(user=pk)
        serializer = CalendarSerializer(calendars, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        """Create a new calendar for a user."""
        serializer = CalendarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        """Update a calendar by ID."""
        if not pk:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Calendar ID is required")
        calendar = Calendar.objects.get(pk=pk)
        serializer = CalendarSerializer(calendar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        """Delete a calendar by ID."""
        if not pk:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Calendar ID is required")
        try:
            calendar = Calendar.objects.get(pk=pk)
            calendar.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
