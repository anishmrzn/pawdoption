from django.urls import path
from .views import addPets, getPets



urlpatterns = [
  path('add-pets/', addPets, name= 'add_pets'),
  path('get-pets/', getPets, name= 'get_pets'),
  path('get-single-pet/<str:pk>/', getPets, name= 'get_single_pet'),
]