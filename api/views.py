from rest_framework.response import Response
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from paws.models import Pets
from .serializers import PetSerializer,CustomUserSerializer,EmailSerializer,CustomTokenObtainPairSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .email_utils import send
from .models import CustomUser
import requests
import json





# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
    {'POST': 'api/token'},
    {'POST': 'api/token/refresh'},
    {'endpoint': 'api/pets'},
    {'POST': 'api/signup'},
    {'methods': ['POST', 'GET'], 'endpoint': 'api/create-product'},    
]

    return Response(routes)


@api_view(['GET'])
def getPets(request):
  pets = Pets.objects.all()
  serializer = PetSerializer(pets, many = True)
  return Response(serializer.data)
  
@api_view(['GET'])
def getSinglePets(request,pk):
    pets = Pets.objects.get(id = pk)
    serializer = PetSerializer(pets, many = False)
    return Response(serializer.data)  


@api_view(['GET'])
def userProfile(request, pk):
    users = CustomUser.objects.get(id = pk)
    serializer = UserProfileSerializer(users, many = False)
    return Response(serializer.data)



@api_view(['POST'])
def customUserCreate(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            confirm_password = serializer.validated_data.get('confirm_password')

            if password != confirm_password:
                return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def customUserLogin(request):
#     if request.method == 'POST':
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def send_email(request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.validated_data.get('subject')
            message = serializer.validated_data.get('message')
            recipients = serializer.validated_data.get('recipients')
            send(subject, message, recipients)
            return Response({'Success':'Email Successfully Sent'},status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        



# def verify_payment(request):
#    data = request.POST
#    product_id = data['product_identity']
#    token = data['token']
#    amount = data['amount']

#    url = "https://khalti.com/api/v2/payment/verify/"
#    payload = {
#    "token": token,
#    "amount": amount
#    }
#    headers = {
#    "Authorization": "Key test_secret_key_c406db1d5d0e425a991d6de296d329e3"
#    }
   

#    response = requests.post(url, payload, headers = headers)
   
#    response_data = json.loads(response.text)
#    status_code = str(response.status_code)

#    if status_code == '400':
#       response = JsonResponse({'status':'false','message':response_data['detail']}, status=500)
#       return response

#    import pprint 
#    pp = pprint.PrettyPrinter(indent=4)
#    pp.pprint(response_data)
   
#    return JsonResponse(f"Payment Done !! With IDX. {response_data['user']['idx']}",safe=False)
    
    import requests
import json
def verify_payment(request):
    url = "https://a.khalti.com/api/v2/epayment/initiate/"

    payload = json.dumps({
        "return_url": "http://example.com/",
        "website_url": "https://example.com/",
        "amount": "1000",
        "purchase_order_id": "Order01",
        "purchase_order_name": "test",
        "customer_info": {
        "name": "Ram Bahadur",
        "email": "test@khalti.com",
        "phone": "9800000001"
        }
})
headers = {
    'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
    'Content-Type': 'application/json',
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)