from django.conf import settings
from rest_framework.response import Response
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import JsonResponse
from paws.models import Pets
from .serializers import PetSerializer,CustomUserSerializer,EmailSerializer,CustomTokenObtainPairSerializer, UserProfileSerializer
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

# Load the trained model
# loaded_model = joblib.load('dog_breed_classifier_model.joblib')





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


class StripeCheckoutView(APIView):
    def post(self, request, *args, **kwargs):
        prod_id=Products.productId
        try:
            product=Products.objects.get(id=prod_id)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        'price_data': {
                            'currency':'usd',
                             'unit_amount':int(Products.price) * 100,
                             'product_data':{
                                 'name':Products.productName,
                                 

                             }
                        },
                        'quantity': 1,
                    },
                ],
                metadata={
                    "product_id":Products.productId
                },
                mode='payment',
                success_url=settings.SITE_URL + '?success=true',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )
            return redirect(checkout_session.url)
        except Exception as e:
            return Response({'msg':'something went wrong while creating stripe session','error':str(e)}, status=500)
        
