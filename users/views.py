import cloudinary.uploader
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import SellerSerializer,SellerProfileSerializer
from rest_framework import status
from .models import Seller

# Create your views here.

@api_view(['POST'])
def customSellerCreate(request):
    if request.method == 'POST':
        serializer = SellerSerializer(data=request.data)
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
def getSellerProfile(request, pk):
    users = Seller.objects.get(sellerId = pk)
    serializer = SellerProfileSerializer(users, many = False)
    return Response(serializer.data)      



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSellerProfile(request,pk):
    try:
        profile = Seller.objects.get(sellerId = pk)
    except Seller.DoesNotExist:
        return Response({'message':'User Not Found'}, status= status.HTTP_404_NOT_FOUND)
    
    serializer = SellerProfileSerializer(profile, data= request.data)
    if serializer.is_valid():
        
        existing = profile.sellerImgUrl
        new = request.data.get('sellerImg')
        
        if new:
            cloudinary_response = cloudinary.uploader.upload(new)
            
            serializer.validated_data['sellerImgUrl'] = cloudinary_response['secure_url']
            
        serializer.save()
        
        return Response(serializer.data)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)   


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSellerProfile(request,pk):
    try:
        profile = Seller.objects.get(sellerId = pk)
        profile.delete()
        return Response({'message':'User deleted successfully'},status= status.HTTP_200_OK)
    except Seller.DoesNotExist:
        return Response({'message':'User not found'}, status= status.HTTP_404_NOT_FOUND)           