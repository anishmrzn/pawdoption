from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductsSerializer, OrderSerializer
from .models import Products,Orders
from rest_framework.permissions import IsAuthenticated
import cloudinary.uploader

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):

    request.data['sellerId'] = request.user.sellerId
    
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
@permission_classes([IsAuthenticated])
def getProductSeller(request, pk=None):
  seller_id = request.user.sellerId
    
  if pk:
      
    product = Products.objects.get(productId=pk, sellerId=seller_id)
    serializer = ProductsSerializer(product, many = False)
    return Response(serializer.data)
  else:
      
    products = Products.objects.filter(sellerId=seller_id)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)


  
 
@api_view(['GET'])
def getSingleProduct(request, pk):
  product = Products.objects.get(productId = pk)
  serializer = ProductsSerializer(product, many = False)
  return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
  try:
    seller_id = request.user.sellerId
    product = Products.objects.get(productId = pk ,sellerId = seller_id)
  except Products.DoesNotExist:
    return Response({"message":"Product not found"}, status= status.HTTP_404_NOT_FOUND)
  
  request.data['sellerId'] = request.user.sellerId
  
  serializer = ProductsSerializer(product, data= request.data)
  if serializer.is_valid():
    
    existing = product.productImgUrl
    new = request.data.get('productImg')
    
    if new:
      cloudinary_response = cloudinary.uploader.upload(new)
      
      serializer.validated_data['productImgUrl'] = cloudinary_response['secure_url']
      
    
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def deleteProduct(request, pk):
  try:
    # seller_id = request.user.sellerId
    product = Products.objects.get(productId = pk)#, sellerId = seller_id)
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
    
    # Get all products
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  else:
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def orders(request):
#   try:
#     user_id = request.user.id
#     orders = Orders.objects.filter(user = user_id)
    
#     serializer = OrderSerializer(orders, many = True)
    
#     return Response(serializer.data, status= status.HTTP_200_OK)
  
#   except:
#     return Response(serializer.errors, status= status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def orders(request):
    try:
        user_id = request.user.id
        orders = Orders.objects.filter(user=user_id)
        
        order_data = []
        for order in orders:
            serializer = OrderSerializer(order)
            order_details = serializer.data
            
            # Include product details within each order
            products = [{'productName': product.productName, 'price': product.price} for product in order.products.all()]
            order_details['products'] = products
            
            order_data.append(order_details)
        
        return Response(order_data, status=status.HTTP_200_OK)
    except Orders.DoesNotExist:
        return Response({'error': 'Orders not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
