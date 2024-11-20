
from django.db import models
from users.models import User
from calendars.models import Calendar


class UsersCalendars(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    calendar_id = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    calendar_type = models.CharField(max_length=50, blank=True)
    calendar_name = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.id

    # USERNAME_FIELD = 'id'
    # REQUIRED_FIELDS = []
