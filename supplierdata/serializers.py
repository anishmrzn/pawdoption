from rest_framework import serializers
from .models import Products
import cloudinary.uploader
# import cloudinary.api
from cloudinary.models import CloudinaryField



class ProductsSerializer(serializers.ModelSerializer):
    
    productImg = serializers.ImageField(write_only = True)
    class Meta:
        model = Products
        fields = '__all__'
        
    def create(self, validated_data):
        
        productImgUrl = validated_data.pop('productImg', None)
        
        product = Products.objects.create(**validated_data)
       
        if productImgUrl:
            cloudinary_response = cloudinary.uploader.upload(productImgUrl)
            product.productImgUrl = cloudinary_response['secure_url']
            product.save()

        return product
        
