from django.conf import settings
from paws.models import PetAdoption
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.db.models import Q

class Command(BaseCommand):
  help = 'Sends approval or rejection emails to the users who requested to adopt a pet'
  
  def handle(self, *args, **kwargs):
    adoptions = PetAdoption.objects.filter(Q(is_approved = True) | Q(is_rejected = True), email_sent = False)
    
    for adoption in adoptions:
      
      if adoption.is_approved:
        
        pet = adoption.petId
        
        owner = pet.owner
        
        message = f"""
        Dear {adoption.full_name},
        
        Your adoption request for '{pet.name}' has been approved.
        Here are the details of the pet owner you need to contact for adopting a furry friend 🐾:
        
        - Owner's Name: {owner.name}
        - Owner's Email: {owner.email}
        - Owner's Phone Number: {owner.contact}
        - Owner's Address: {owner.address}
        
        Please feel free to contact the owner for further information.
        
        Best regards,
        Pet Adoption Team - Pawdoption
        """
        
        send_mail(
          subject= 'Congratulations !!🎉 Adoption Request Approved',
          message=message,
          from_email=settings.EMAIL_HOST_USER,
          recipient_list=[adoption.email],
          fail_silently=False,
        )
      
      elif adoption.is_rejected:  
        
        pet = adoption.petId
        
        message = f"""
        
        Dear {adoption.full_name},
        
        Unfortunately, your adoption request for '{pet.name}' has been rejected.
        Please contact us for more information.
        
        Best regards,
        Pet Adoption Team - Pawdoption
        """
        send_mail(
          subject='Sorry for the Inconvenience.',
          message=message,
          from_email=settings.EMAIL_HOST_USER,
          recipient_list=[adoption.email],
          fail_silently=False,
        )
        
      adoption.email_sent = True
      adoption.save()
    
    self.stdout.write(self.style.SUCCESS('Email sent successfully'))    