from django.urls import path, include
from .views import createProduct, getProduct, getProductSeller,getSingleProduct, updateProduct,deleteProduct, products


urlpatterns = [
    path('create-product/', createProduct, name = 'create-product'),
    path('get-product/', getProduct, name = 'get-product'),
    path('single-product/<str:pk>/', getSingleProduct, name = 'single-product'),
    path('update/<str:pk>/', updateProduct, name = 'update-product'),
    path('delete/<str:pk>/',deleteProduct, name = 'delete-product'),
    path('products/', products, name = 'all-products'),
    path('products/<str:pk>/', products, name = 'single-product'),
    path('get-product-seller/',getProductSeller, name = 'get-product-seller'),
    path('get-product-seller/<str:pk>/', getProductSeller, name = 'single-product-seller')
    
]
