from rest_framework import serializers
from .models import Pets, PetAdoption
import cloudinary.uploader

class PetSerializer(serializers.ModelSerializer):
  
  petImg = serializers.ImageField(write_only = True)
  class Meta:
    model = Pets
    fields = '__all__'
    
  def create(self, validated_data):
    
    petImgUrl = validated_data.pop('petImg', None)
    
    pet = Pets.objects.create(**validated_data)
    
    if petImgUrl:
      cloudinary_response = cloudinary.uploader.upload(petImgUrl)
      pet.petImgUrl = cloudinary_response['secure_url']
      pet.save()
      
    return pet
  

class PetAdoptionSerializer(serializers.ModelSerializer):

    class Meta:
      model = PetAdoption
      fields = '__all__'