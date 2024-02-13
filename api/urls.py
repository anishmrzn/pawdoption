from django.urls import path,include
from . import views

from .views import customUserCreate, send_email,CustomTokenObtainPairView, getUserProfile,updateUserProfile,deleteUserProfile,predict_dog_breed, StripeCheckoutView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from supplierdata.urls import (createProduct,getSingleProduct,getProduct
,getProductSeller,updateProduct,deleteProduct,products)


urlpatterns = [
    path('', views.getRoutes, name = 'routes'),

    path('pets/', include('paws.urls')),
    path('predict/', predict_dog_breed, name='predict_dog_breed'),

    path('', include('paws.urls')),

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('seller/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', customUserCreate, name='create_user'),
    path('create-product/', createProduct, name = 'create-product'),
    path('get-product/', getProduct, name = 'get-product'),
    path('single-product/<str:pk>/', getSingleProduct, name = 'single-product'),
    path('update/<str:pk>/', updateProduct, name = 'update-product'),
    path('delete/<str:pk>/',deleteProduct, name = 'delete-product'),
    path('products/', products, name = 'products'),
    path('products/<str:pk>/', products, name = 'products'),
    path('send-email/', send_email, name='send_email'),
    path('seller/', include('users.urls')),
    path('user-profile/',getUserProfile, name = 'show_user_profile'),
    path('get-product-seller/',getProductSeller, name = 'get-product-seller'),
    path('get-product-seller/<str:pk>/', getProductSeller, name = 'single-product-seller'),
    path('update-user-profile/', updateUserProfile, name= 'update-user-profile'),
    path('delete-user-profile/', deleteUserProfile, name= 'Delete-user-profile'),
    path('create-checkout-session/', StripeCheckoutView.as_view(), name='checkout_session')

]


