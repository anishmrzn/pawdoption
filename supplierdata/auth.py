from django.conf import settings
from api.models import CustomUser
from users.models import Seller

def authenticate_user_model(request):
  model = settings.AUTH_USER_MODEL
  if model == 'users.Seller':
    return request.user.sellerId if isinstance(request.user, Seller) else None
  elif model == 'api.CustomUser':
    return request.user if isinstance(request.user, CustomUser) else None
  else:
    return request.user.sellerId
