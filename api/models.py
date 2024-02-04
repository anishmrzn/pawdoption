from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class CustomUser(AbstractUser):
    id = models.UUIDField(default = uuid.uuid4, primary_key = True, unique = True, editable = True)
    email = models.EmailField(max_length = 50,unique=True)
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=255)
    userImg = models.ImageField(upload_to= 'user-profiles', default='images/user-default.png',blank= True, null= True )
    password = models.CharField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username