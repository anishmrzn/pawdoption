from django.urls import path,include
from . import views
from .views import customSellerCreate,getSellerProfile,updateSellerProfile,deleteSellerProfile




urlpatterns = [
    path('signup/', customSellerCreate, name = 'create_seller'),
    path('profile/', getSellerProfile, name= 'get-seller-profile'),
    path('update-profile/', updateSellerProfile, name= 'update-seller-profile'),
    path('delete-profile/', deleteSellerProfile, name= 'delete-seller-profile'),
    
]
