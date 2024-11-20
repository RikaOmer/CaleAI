
from django.db import models


class TaskType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=150)
    label = models.CharField(max_length=150)
    emoji = models.CharField(max_length=100)

    def __str__(self):
        return self.id
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "label": self.label,
            "emoji": self.emoji
    }

    # USERNAME_FIELD = 'id'
    # REQUIRED_FIELDS = []
