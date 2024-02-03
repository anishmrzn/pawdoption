from rest_framework.serializers import ModelSerializer
from paws.models import Pets
from .models import CustomUser 
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser
from users.models import Seller

class PetSerializer(ModelSerializer):
  class Meta:
    model = Pets
    fields = '__all__'
    
    

class CustomUserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ( 'email', 'username', 'name', 'password', 'confirm_password')
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
    
    
    
class EmailSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=255)
    message = serializers.CharField()
    recipients = serializers.ListField(child=serializers.EmailField())
    
    


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {
            'username': attrs.get('username'),
            'password': attrs.get('password')
        }

        # Authenticate both CustomUser and Seller
        user = CustomUser.objects.filter(username=credentials['username']).first()
        if not user:
            user = Seller.objects.filter(username=credentials['username']).first()

        if user and user.check_password(credentials['password']):
            refresh = self.get_token(user)
            data = {'refresh': str(refresh), 'access': str(refresh.access_token)}
            return data
        else:
            raise serializers.ValidationError("Unable to log in with provided credentials.")

    