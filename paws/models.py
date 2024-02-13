from django.db import models
import uuid
from api.models import CustomUser
from django.contrib.auth import get_user_model

# Create your models here.
class Pets(models.Model):
  
  petId = models.UUIDField(
    default = uuid.uuid4, unique = True, primary_key = True, editable = False)
  name = models.TextField(max_length = 200)
  age = models.TextField(max_length = 50, blank= True)
  breed = models.CharField(max_length = 50, blank = True, null = True)
  gender = models.CharField(max_length = 10, blank = True)
  description = models.TextField(blank = True, null = True)
  petImgUrl = models.URLField(blank = True)
  email = models.EmailField(null = True)

  username = models.CharField(max_length = 50, null = True)

  is_approved = models.BooleanField(default = False)
  is_rejected = models.BooleanField(default = False)
  created = models.DateTimeField(auto_now_add = True)
  owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, blank= True,null = True)
  
  
  def __str__(self):
    return self.name
