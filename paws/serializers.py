from .models import Pets
from rest_framework.serializers import ModelSerializer



class PetSerializer(ModelSerializer):
  class Meta:
    model = Pets
    fields = '__all__'