
from django.db import models
from users.models import User
from calendars.models import Calendar
from task.models import Task


class Event(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    from_time = models.TimeField(blank=False, null=False)
    to_time = models.TimeField(blank=False, null=False)
    is_constant = models.BooleanField()
    date = models.DateField(blank=False, null=False)

    def __str__(self):
        return f"{str(self.task_id)} on {self.date} from {self.from_time} to {self.to_time}"
    
    def to_json(self):
        return {
            "id": self.id,
            "task_id": self.task_id.to_json(),
            "from_time": self.from_time,
            "to_time": self.to_time,
            "is_constant": self.is_constant,
            "date": self.date
    }


    # USERNAME_FIELD = 'id'
    # REQUIRED_FIELDS = []
