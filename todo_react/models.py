from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ToDo(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    done = models.BooleanField(default=False)

class UserToDos(models.Model)
    user = models.ForeignKey(User)
    todos = models.OneToManyField(ToDo)
