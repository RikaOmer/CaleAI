
from django.db import models
from users.models import User
from calendars.models import Calendar
from task_type.models import TaskType


class Task(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    type_id = models.ForeignKey(TaskType, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=True)
    from_time = models.TimeField(blank=True, null=True) #optional field if is constant 
    to_time = models.TimeField(blank=True, null=True) # optional field if is constant
    frequency = models.CharField(max_length=150,null=False) # one time, daily, weekly, monthly, yearly 
    duration = models.IntegerField() # in minutes
    is_morning = models.BooleanField()  # if this task prefers morning
    is_noon = models.BooleanField() # if this task prefers noon
    is_evening = models.BooleanField() # if this task prefers evening

    def __str__(self):
        return str(self.id)
    
    def to_json(self):
        return {
            "user_id": self.user_id.to_json(),
            "type_id": self.type_id.to_json(),
            "id": self.id,
            "name": self.name,
            "from_time": self.from_time,
            "to_time": self.to_time,
            "frequency": self.frequency,
            "duration": self.duration,
            "is_morning": self.is_morning,
            "is_noon": self.is_noon,
            "is_evening": self.is_evening
    }

    # USERNAME_FIELD = 'id'
    # REQUIRED_FIELDS = []
