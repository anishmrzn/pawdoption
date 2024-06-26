from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser,Group,Permission

# Create your models here.
class Seller(AbstractUser):
    sellerId = models.UUIDField(default=uuid.uuid4,unique=True,primary_key = True, editable = False)
    name = models.CharField(max_length = 50)
    username = models.CharField(max_length = 50, unique = True)
    email = models.EmailField(max_length = 50, unique = True)
    pan_number = models.TextField(max_length = 10)
    contact = models.CharField(max_length = 10, blank = True)
    sellerImgUrl = models.URLField(default = 'https://res.cloudinary.com/djzfsffst/image/upload/v1707144245/user-default_macios.png', blank = True)
    store_location = models.TextField(blank = True, null = True)
    password = models.CharField(max_length = 255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, blank=True, related_name='seller_groups')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='seller_user_permissions')
    
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.username