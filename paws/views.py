from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import PetSerializer
from .models import Pets

# Create your views here.


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
