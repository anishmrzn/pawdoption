from rest_framework.serializers import ModelSerializer
from .models import Seller
from rest_framework import serializers



class SellerSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Seller
        fields = ('email', 'username', 'name', 'password', 'confirm_password')
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
    
    