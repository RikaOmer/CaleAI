
from django.db import models
from django.contrib.auth.hashers import make_password


class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    morning_start_time = models.TimeField(blank=False, null=False)
    day_end_time = models.TimeField(blank=False, null=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=256)
    token = models.CharField(max_length=512, blank=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.email

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get(token):
        return User.objects.get(token=token)
    
    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "morning_start_time": self.morning_start_time,
            "day_end_time": self.day_end_time,
            "email": self.email,
        }
