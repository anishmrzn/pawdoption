from rest_framework import serializers
from .models import Products
# import cloudinary.uploader
# import cloudinary.api
# from cloudinary.models import CloudinaryField



class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
        
