from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class CustomUser(AbstractUser):
    id = models.UUIDField(default = uuid.uuid4, primary_key = True, unique = True, editable = True)
    email = models.EmailField(max_length = 50,unique=True)
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length = 10, blank = True)
    userImgUrl = models.URLField(default='https://res.cloudinary.com/djzfsffst/image/upload/v1707144245/user-default_macios.png',blank= True )
    address = models.TextField(blank = True)
    password = models.CharField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username