from django.urls import path,include
from . import views
from .views import customSellerCreate,getSellerProfile,updateSellerProfile,deleteSellerProfile




urlpatterns = [
    path('signup/', customSellerCreate, name = 'create_seller'),
    path('get-seller-profile/<str:pk>/', getSellerProfile, name= 'get-seller-profile'),
    path('update-seller-profile/<str:pk>/', updateSellerProfile, name= 'update-seller-profile'),
    path('delete-seller-profile/<str:pk>/', deleteSellerProfile, name= 'delete-seller-profile'),
    
]
