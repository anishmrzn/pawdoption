from django.db import models
import uuid

# Create your models here.
class Pets(models.Model):
  petId = models.UUIDField(
    default = uuid.uuid4, unique = True, primary_key = True, editable = False)
  name = models.TextField(max_length = 200)
  age = models.TextField(max_length = 50, blank= True)
  breed = models.CharField(max_length = 200, blank = True, null = True)
  created = models.DateTimeField(auto_now_add = True)
  
  
  def __str__(self):
    return self.name