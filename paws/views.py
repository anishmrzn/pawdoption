from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import PetSerializer, PetAdoptionSerializer
import stripe
from rest_framework.views import APIView
from .models import Pets

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])

def addPets(request):
  

  mutable = request.data.copy()

  
  mutable['owner'] = request.user.id
  mutable['email'] = request.user.email
  mutable['username'] = request.user.username
  
  serializer = PetSerializer(data=mutable)
  if serializer.is_valid():
    
    serializer.save()
    return Response(serializer.data, status= status.HTTP_201_CREATED)
  return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    


#for home page
@api_view(['GET'])
def getPets(request,pk = None):
  
  if pk:
    #get single pet
    try:
      pet = Pets.objects.get(petId = pk)
      if pet.is_approved:
        serializer = PetSerializer(pet)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
      else:
        return Response({'error': 'Pet not approved'}, status= status.HTTP_403_FORBIDDEN)
    except Pets.DoesNotExist:
      return Response({'error': 'Pet not found'}, status=status.HTTP_404_NOT_FOUND)
  
  else:
    #get all pets
    pets = Pets.objects.filter(is_approved = True)
    serializer = PetSerializer(pets, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  
  
# @api_view(['POST'])
# def send_approval_rejection_emails(request):

#     pets = Pets.objects.filter(Q(is_approved=True) | Q(is_rejected=True), email_sent=False)

#     for pet in pets:

#         if pet.is_approved:
#             send_mail(
#                 subject='Congratulations!',
#                 message='Your pet form has been approved. Thank you!',
#                 from_email=settings.EMAIL_HOST_USER, 
#                 recipient_list=[pet.email], 
#                 fail_silently=False,
#             )
        

#         if pet.is_rejected:
#             send_mail(
#                 subject='Sorry!',
#                 message='Your pet form has been rejected. Please contact us for more information.',
#                 from_email=settings.EMAIL_HOST_USER,  
#                 recipient_list=[pet.email], 
#                 fail_silently=False,
#             )


#         pet.email_sent = True
#         pet.save()

#     return Response({'message': 'Emails sent successfully'}, status=status.HTTP_200_OK)
# send_emails.py


@api_view(['POST'])

@permission_classes([IsAuthenticated])
def send_feedback_email(request):
    if request.method == 'POST':
        subject = request.data.get('subject', '')
        message = request.data.get('message', '')

        if subject and message:
            from_email = request.user.email #
            recipient_email = settings.EMAIL_HOST_USER

            send_mail(
                subject=subject,
                message=message,
                from_email=from_email,
                recipient_list=[recipient_email],
                fail_silently=False,
            )

            return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Subject and message are required'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Only POST requests are allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_adoption_application(request):
    if request.method == 'POST':

        mutable = request.data.copy()
        mutable['petId'] = request.data.get('petId')
        
        serializer = PetAdoptionSerializer(data=mutable)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:
      return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@permission_classes([IsAuthenticated]) 
def ChangePassword(request):
  user = request.user

  
  old_password = request.data.get('old_password')
  new_password = request.data.get('new_password')
  
  if user.check_password(old_password):
    user.set_password(new_password)
    user.save()
    
    return Response({'message': 'Password changed successfully'}, status= status.HTTP_202_ACCEPTED)
  
  return Response({'error': 'Invalid old password'}, status= status.HTTP_400_BAD_REQUEST) 




stripe.api_key = settings.STRIPE_SECRET_KEY

class AdoptionCheckout(APIView):
    def post(self, request):
        try:
            pet_info = request.data.get('pet_info')  # Assuming pet_info contains pet information
            
            # Assuming there's a fixed adoption price per pet
            adoption_price = 1000  # $50.00 in cents

            line_items = [{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': adoption_price,
                    'product_data': {
                        'name': 'Pet Adoption Fee',
                    },
                },
                'quantity': 1,
            }]

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url=settings.SITE_URL + '?successful_payment=true',
                cancel_url=settings.SITE_URL,
            )

            return Response({'url': session.url})

        except Exception as e:
            return Response({'error': str(e)}, status=500)