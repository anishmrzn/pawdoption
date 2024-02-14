from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer,EmailSerializer,CustomTokenObtainPairSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .email_utils import send
from .models import CustomUser
from supplierdata.models import Products ,Orders
from decimal import Decimal
import cloudinary.uploader
import stripe
from django.views.decorators.csrf import csrf_exempt
import joblib
import pandas as pd
import json

# loaded_model = joblib.load('dog_breed_classifier_model.joblib')

# Load the trained model
loaded_model = joblib.load(r'MLquiz\breedquiz.joblib')


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    
    users = request.user
    serializer = UserProfileSerializer(users)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    try:
        profile = request.user
    except CustomUser.DoesNotExist:
        return Response({'message':'User Not Found'}, status= status.HTTP_404_NOT_FOUND)
    
    serializer = UserProfileSerializer(profile, data= request.data)
    if serializer.is_valid():
        
        existing = profile.userImgUrl
        new = request.data.get('UserImg')
        
        if new:
            cloudinary_response = cloudinary.uploader.upload(new)
            
            serializer.validated_data['userImgUrl'] = cloudinary_response['secure_url']
            
        serializer.save()
        
        return Response(serializer.data)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUserProfile(request):
    try:
        profile = request.user
        profile.delete()
        return Response({'message':'User deleted successfully'},status= status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'message':'User not found'}, status= status.HTTP_404_NOT_FOUND)



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
        
@csrf_exempt
@api_view(['POST'])
def predict_dog_breed(request):
    # print(request.body)
    try:
        # Get user responses from the request
        data = json.loads(request.body)
        user_responses = data.get('user_responses', [])

        # Convert user responses to DataFrame
        user_df = pd.DataFrame(user_responses)
        # user_df = pd.get_dummies(user_df)
        # print(user_responses)
        # print(user_df.columns.to_list())
        print(user_df)
        # Predict the dog breed
        prediction = loaded_model.predict(user_df)
        print("----------------------------------",prediction)
        recommended_breed = prediction[0]

        return Response({"recommended_breed": recommended_breed})

    except Exception as e:
        return Response({"error": str(e)})     

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY

@permission_classes([IsAuthenticated])
class StripeCheckoutView(APIView):
    def post(self, request):
        try:

            selected_products = request.data.get('products', [])  
            
            line_items = []
            total_amount = 0
            
            for item in selected_products:
                
                product_id = item.get('productId')
                quantity = item.get('quantity')
                product = Products.objects.get(productId = product_id)
                line_item_price = int(product.price * 100)
                total_amount += line_item_price * quantity
                

                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': line_item_price,  
                        'product_data': {
                            'name': product.productName,
                        },
                    },

                    'quantity': quantity,
                })
                
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,

                mode='payment',
                success_url=settings.SITE_URL + 'orders',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )
            
            total_amount_dollars = Decimal(session.amount_total) / 100
            total_amount_dollars = total_amount_dollars.quantize(Decimal('0.01'))
            
            user_id = request.user
            order = Orders.objects.create(
                user = user_id,
                total_amount = total_amount_dollars,
                quantity = sum(item['quantity'] for item in selected_products )
            )
            
            for item in selected_products:
                product_id = item.get('productId')
                quantity = item.get('quantity')
                product = Products.objects.get(productId = product_id)
                order.products.add(product)
            
            
            return Response({'success_url': settings.SITE_URL ,
                             'url':session.url,
                             })
            
        except Exception as e:
            return Response({'error': str(e)}, status=500)


