from django.db import models
import uuid


# Create your models here.
# class Products(models.Model):
#     productId = models.UUIDField(default=uuid.uuid4,unique=True,primary_key = True, editable = False)
#     productName = models.TextField(max_length = 200, blank = False, null = False)
#     shortDescription = models.TextField(max_length = 50, blank = True, null = True)
#     productImg = models.ImageField(blank=True, upload_to='yesma lekhna baki')
#     Description = models.TextField(max_length = 200, blank = True, null = True)
#     price = models.DecimalField(max_digits=8, decimal_places=2)(max_length = 200, blank = True, null = True)
#     stock = models.IntegerField(editable = True,blank = False, null = False)
#     discount = models.DecimalField(max_digits=8, decimal_places=2,blank = True, null = True)
#     category = models.TextField(max_length = 200, blank = False, null = False)
#     featured = models.BooleanField(default=0)
#     created = models.DateTimeField(auto_now_add = True)
#     #supplierId= models.ForeignKey('Supplier',on_delete=models.CASCADE)

  
  
#     def __str__(self):
#      return self.productName