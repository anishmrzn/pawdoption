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


@api_view(['PUT'])
def updateProduct(request, pk):
  try:
    product = Products.objects.get(productId = pk)
  except Products.DoesNotExist:
    return Response({"message":"Product not found"}, status= status.HTTP_404_NOT_FOUND)
  
  serializer = ProductsSerializer(product, data= request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def deleteProduct(request, pk):
    try:
        product = Products.objects.get(productId=pk)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status = status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
      

@api_view(['GET'])
def products(request, pk=None):
    if request.method == 'GET':
        if pk:
            # Get a single product by ID
            try:
                product = Products.objects.get(productId = pk)  
                serializer = ProductsSerializer(product)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Products.DoesNotExist:
                return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Get all products
            products = Products.objects.all()
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



  