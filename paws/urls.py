from django.urls import path
from .views import addPets, getPets, ChangePassword #send_approval_rejection_emails,



urlpatterns = [
  path('add-pets/', addPets, name= 'add_pets'),
  path('get-pets/', getPets, name= 'get_pets'),
  path('get-pets/<str:pk>/', getPets, name= 'get_single_pet'),
  path('password/',ChangePassword , name= 'Change_Password'),
  # path('email/', send_approval_rejection_emails, name = 'Send_Email_To_Users'),
]