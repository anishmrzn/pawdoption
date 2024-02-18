from django.urls import path

from .views import addPets, getPets,send_feedback_email,submit_adoption_application #send_approval_rejection_emails,

from .views import addPets, getPets, ChangePassword, AdoptionCheckout #send_approval_rejection_emails,




urlpatterns = [
  path('add-pets/', addPets, name= 'add_pets'),
  path('get-pets/', getPets, name= 'get_pets'),
  path('get-pets/<str:pk>/', getPets, name= 'get_single_pet'),
  path('password/',ChangePassword , name= 'Change_Password'),
  # path('email/', send_approval_rejection_emails, name = 'Send_Email_To_Users'),

  path('email-us/', send_feedback_email, name= "send_feedback_email"),
  path('petadoption-form/',submit_adoption_application, name= "submit_adoption_application"),
  path('AdoptionCheckout/', AdoptionCheckout.as_view(), name='checkout_session')

]