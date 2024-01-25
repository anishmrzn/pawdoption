from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# Create your models here.


class CustomUserManager(BaseUserManager):
    def createuser(self, email, username, name, password=None):
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, name=name)
        user.set_password(password)
        # user.set_password(confirm_password)
        user.save(using=self._db)
        return user
    
    # def createsuperuser(self, email, username, name, password=None, **extra_fields):
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_superuser', True)
    #     return self.createuser(email, username, name, password, **extra_fields)
    

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length = 50,unique=True)
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default='')
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name']

    def __str__(self):
        return self.username
