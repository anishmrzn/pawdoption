from django.urls import path
from . import views



urlpatterns = [
  path('get-pets/', views.getPets, name= 'get_pets'),
  path('get-single-pet/<str:pk>/', views.getSinglePets, name= 'get_single_pet'),
]