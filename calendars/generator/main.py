
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.http import JsonResponse
from calendars.generator.AStarScheduler import AStarScheduler
import calendar
from event.models import Event
def generate(user_id):
    start_date = datetime.now()  # Example start date

    # Get the last day of the current month
    last_day = calendar.monthrange(start_date.year, start_date.month)[1]
    # last_day = datetime(2024, 12, 31)
    # Set end_date as the last day of the current month with the time set to 20:00
    # end_date = datetime(start_date.year, start_date.month, last_day, 20, 0)
    end_date = datetime(2024, 12, 31, 20, 0)
    scheduler = AStarScheduler(user_id, start_date, end_date)
    constant_events = Event.objects.filter(user_id=user_id, is_constant=True)
    events = scheduler.schedule(constant_events)

    if events:
        # Delete all existing events for the user
        Event.objects.filter(user_id=user_id).delete()
        # Save all events to the database
        for event in events:
            event.save()
        return JsonResponse({"success": True, "events": [str(event) for event in events]})
    return JsonResponse({"success": False, "message": "No valid schedule found"})
