from django.db import models
import uuid
from users.models import Seller
from api.models import CustomUser

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
  discounted = models.DecimalField(max_digits=8, decimal_places=2,null = True)
  seller = models.TextField(blank = True, null = True)
  contact = models.TextField(blank = True, null = True)
  category = models.TextField(max_length = 200, blank = False, null = True)
  animalCategory = models.TextField(max_length = 200, blank = False, default = 'Dog')
  featured = models.BooleanField(default=0)
  created = models.DateTimeField(auto_now_add = True)
  sellerId = models.ForeignKey(Seller,on_delete=models.CASCADE, blank = True, null = True)
  
  
  def save(self, *args, **kwargs):
    if self.price and self.discount:
        discount_amount = self.price * (self.discount / 100)
        discounted_price = self.price - discount_amount
        if discounted_price >= 0:
            self.discounted = discounted_price
        else:
            self.discounted = 0
    super().save(*args, **kwargs)


  def __str__(self):
    return self.productName
      
class Orders(models.Model):
    
  DELIVERY = [
      ('delivered', 'Delivered'),
      ('pending', 'Pending'),
  ]
     
  orderId = models.UUIDField(default = uuid.uuid4, unique = True, primary_key = True, editable = False)
  products = models.ManyToManyField(Products)
  total_amount = models.DecimalField(max_digits = 10, decimal_places = 2)
  quantity = models.PositiveIntegerField()
  delivery_status = models.CharField(max_length = 10, choices = DELIVERY, default = 'pending')
  created = models.DateField(auto_now_add = True)
  user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    
  def __str__(self):
    return f'Created: {self.created.strftime("%Y-%m-%d")} - Status: {self.delivery_status}'
      
   