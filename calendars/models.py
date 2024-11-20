from django.db import models
# from users.models import User

class Calendar(models.Model):
    id = models.AutoField(primary_key=True)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    calendar_url = models.CharField(max_length=255)
    source = models.CharField(max_length=255)

    def __str__(self):
        return self.source + self.calendar_url
