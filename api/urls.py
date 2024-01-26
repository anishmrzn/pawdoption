from django.urls import path
from . import views
from .views import customUserCreate, customUserLogin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes, name = 'routes'),
    path('pets/', views.getPets, name= 'get_pets'),
    path('pets/<str:pk>/', views.getSinglePets, name= 'get_single_pet'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', customUserCreate, name='create_user'),
    path('login/', customUserLogin, name='login_user'),

]
