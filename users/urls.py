from django.urls import path,include
from . import views
from .views import customSellerCreate




urlpatterns = [
    path('signup/', customSellerCreate, name = 'create_seller'),
]
