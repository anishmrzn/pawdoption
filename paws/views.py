from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import PetSerializer
from .models import Pets

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])

def addPets(request):
  
  request.data['ownerId'] = request.user.id
  request.data['owner'] = request.user.name
  request.data['email'] = request.user.email
  
  serializer = PetSerializer(data=request.data)
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
    
  
  