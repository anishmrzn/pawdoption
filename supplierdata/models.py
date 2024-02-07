from django.db import models
import uuid
# import cloudinary
# import cloudinary.uploader
# import cloudinary.api
# from cloudinary.models import CloudinaryField
from users.models import Seller

# Create your models here.

    
    
class Products(models.Model):
  
  productId = models.UUIDField(default=uuid.uuid4,unique=True,primary_key = True, editable = False)
  productName = models.TextField( blank = False, null = False)
  shortDescription = models.TextField( blank = True, null = True)
  productImgUrl = models.URLField(blank= True)
  Description = models.TextField( blank = True, null = True)
  price = models.DecimalField(max_digits=8, decimal_places=2)
  stock = models.IntegerField(editable = True,blank = False, null = False)
  discount = models.DecimalField(max_digits=8, decimal_places=2,blank = True, null = True)
  category = models.TextField(max_length = 200, blank = False, null = True)
  animalCategory = models.TextField(max_length = 200, blank = False, default = 'Dog')
  featured = models.BooleanField(default=0)
  created = models.DateTimeField(auto_now_add = True)
  sellerId = models.ForeignKey(Seller,on_delete=models.CASCADE, blank = True, null = True)
 
  def __str__(self):
    return self.productName
   