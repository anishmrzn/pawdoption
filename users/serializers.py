from rest_framework.serializers import ModelSerializer
from .models import Seller
from rest_framework import serializers
import cloudinary.uploader



class SellerSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Seller
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
            }

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")

        return data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        confirm_password = validated_data.pop('confirm_password', None)
        instance = self.Meta.model(**validated_data)
        
        if password and confirm_password is not None:
            instance.set_password(password)
            
        instance.save()    
        return instance    
    
    
    
class SellerProfileSerializer(ModelSerializer):
    
    sellerImg = serializers.ImageField(write_only = True, default = 'https://res.cloudinary.com/djzfsffst/image/upload/v1707144245/user-default_macios.png')
    
    class Meta:
        model = Seller
        fields = '__all__'
        
    def create(self, validated_data):
        
        sellerImgUrl = validated_data.pop('sellerImg', None)
        
        photo = Seller.objects.create(**validated_data)
       
        if sellerImgUrl:
            cloudinary_response = cloudinary.uploader.upload(sellerImgUrl)
            photo.sellerImgUrl = cloudinary_response['secure_url']
            photo.save()

        return photo
        
        
    
    