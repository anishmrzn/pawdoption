from django.db import models
import uuid
from api.models import CustomUser
from django.contrib.auth import get_user_model

# Create your models here.
class Pets(models.Model):
  
  petId = models.UUIDField(
    default = uuid.uuid4, unique = True, primary_key = True, editable = False)
  name = models.TextField(max_length = 200)
  animal = models.CharField(max_length = 10, default = True, null = True)
  age = models.TextField(max_length = 50, blank= True)
  breed = models.CharField(max_length = 50, blank = True, null = True)
  gender = models.CharField(max_length = 10, blank = True)
  description = models.TextField(blank = True, null = True)
  petImgUrl = models.URLField(blank = True)
  email = models.EmailField(null = True)
  vaccinated = models.CharField(max_length = 10, blank = True)
  medicalDescription = models.TextField(blank = True, null = True)
  username = models.CharField(max_length = 50, null = True)

  is_approved = models.BooleanField(default = False)
  is_rejected = models.BooleanField(default = False)
  email_sent = models.BooleanField(default = False)
  created = models.DateTimeField(auto_now_add = True)
  owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, blank= True,null = True)
  
  
  def __str__(self):
    return f'Name: {self.name} - Date Added: {self.created.strftime("%Y-%m-%d %H:%M:%S")}'
  
