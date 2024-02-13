from django.conf import settings
from rest_framework.response import Response
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer,EmailSerializer,CustomTokenObtainPairSerializer, UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .email_utils import send
from .models import CustomUser
from supplierdata.models import Products
import cloudinary.uploader

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import joblib
import pandas as pd
import json

# loaded_model = joblib.load('dog_breed_classifier_model.joblib')

# Load the trained model
loaded_model = joblib.load('dog_breed_classifier_model.joblib')


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



        

import stripe
from django.shortcuts import get_object_or_404

stripe.api_key = settings.STRIPE_SECRET_KEY

# class StripeCheckoutView(APIView):
#     def post(self, request):
#         try:
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price': 'price_1Oie9XHRxrEnXWBtq8aqWoSX',
#                         'quantity': 1,
#                     },
#                 ],
#                 payment_method_types=['card',],
#                 mode='payment',
#                 success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
#                 cancel_url=settings.SITE_URL + '/?canceled=true',
#             )

#             return redirect(checkout_session.url)
#         except:
#             return Response(
#                 {'error': 'Something went wrong when creating stripe checkout session'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


# class StripeCheckoutView(APIView):
#     def post(self, request,pk, *args, **kwargs):
#         # prod_id = request.data.get('productId')  # Assuming you're sending productId in the request data
#         try:
#             # product=Products.objects.get(productId=prod_id)
#             product = get_object_or_404(Products, productId=pk)
#             print(product.productName)
            
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
#                         'price_data': {
#                             'currency':'usd',
#                              'unit_amount':int(product.price)*100,
#                              'product_data':{
#                                  'name':product.productName,
                                 

#                              }
                             
#                         } ,
#                         'quantity': 1,
#                     },
#                 ],
        
#                 mode='payment',
#                 success_url=settings.SITE_URL + '?success=true',
#                 cancel_url=settings.SITE_URL + '?canceled=true',
#             )
            
#             return redirect(checkout_session.url)
#         except Products.DoesNotExist:
#             return Response({'error': 'Product not found'},status=404)
#         except Exception as e:
#             return Response({'msg':'something went wrong while creating stripe session','error':str(e)}, status=500)



class StripeCheckoutView(APIView):
    def post(self, request,pk, *args, **kwargs):
        try:
            # Get selected product IDs from the request data
            selected_product_ids = request.data.get('productId', [])  # Assuming the frontend sends selected product IDs


            products = Products.objects.filter(productId=pk)


            line_items = []
            for product in products:
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(product.price * 100),  # Convert price to cents
                        'product_data': {
                            'name': product.productName,
                        },
                    },
                    'quantity': 1,
                })
            # for item in line_items:
            #     price_data = item.get('price_data', {})
            #     unit_amount = price_data.get('unit_amount', 0)
            #     currency = price_data.get('currency', '')
            #     print(f"Unit Amount: {unit_amount}, Currency: {currency}")
            # Create checkout session
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url=settings.SITE_URL + '?success=true',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )
            print(session)
            
            return Response({'message': 'Checkout session created successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)

      

     
