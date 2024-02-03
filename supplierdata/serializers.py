from rest_framework import serializers
from .models import Products
# import cloudinary.uploader
# import cloudinary.api
# from cloudinary.models import CloudinaryField



class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
        
    # def create(self, validated_data):
        
    #     image_file = validated_data.pop('productImg', None)
        
    #     product_instance = Products.objects.create(**validated_data)
       
    #     if image_file:
    #         product_instance.productImg = image_file
    #         product_instance.save()

    #     return product_instance
        
