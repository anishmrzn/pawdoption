from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductsSerializer
from .models import Products
from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createProduct(request):
    serializer = ProductsSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProduct(request):  
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many = True)
    return Response(serializer.data)
  
 
@api_view(['GET'])
def getSingleProduct(request, pk):
  product = Products.objects.get(productId = pk)
  serializer = ProductsSerializer(product, many = False)
  return Response(serializer.data)
    
  

