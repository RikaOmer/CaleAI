import os
import django

# Set up Django environment


os.environ.setdefault("DJANGO_SETTINGS_MODULE", 'backend.settings') 
django.setup()

from task_type.models import TaskType
from task_type.serializers import TaskTypeSerializer


activities_data = {
    "call": {
        "label": "Call Mom",
        "emoji": "📞",
        "color": "tertiary"
    },
    "exercise": {
        "label": "Exercise",
        "emoji": "🏋️",
        "color": "secondary"
    },
    "read": {
        "label": "Read a book",
        "emoji": "📖",
        "color": "fourth"
    },
    "listenToMusic": {
        "label": "Listen to music",
        "emoji": "🎧",
        "color": "fifth"
    },
    "Learning": {
        "label": "Learning",
        "emoji": "📚",
        "color": "primary"
    },
    "clean": {
        "label": "Clean the house",
        "emoji": "🧹",
        "color": "tertiary"
    },
    "other": {
        "label": "Other",
        "emoji": "📅",
        "color": "textPrimary"
    }
}


for name, data in activities_data.items():
    task_data = {
        "name": name,
        "label": data["label"],
        "emoji": data["emoji"],
        "color": data["color"]
    }
    serializer = TaskTypeSerializer(data=task_data)
    if serializer.is_valid():
        serializer.save()
        print(f'Successfully saved task: {task_data["label"]}')
    else:
        print(f'Error saving task {task_data["label"]}:', serializer.errors)
    