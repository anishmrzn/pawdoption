from django.contrib import admin
from .models import Pets, PetAdoption

# Register your models here.


admin.site.register(Pets)
admin.site.register(PetAdoption)

