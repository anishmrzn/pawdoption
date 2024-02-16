from django.conf import settings
from paws.models import Pets
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.db.models import Q


class Command(BaseCommand):
    help = 'Sends approval or rejection emails for pets'

    def handle(self, *args,  **kwargs):
        pets = Pets.objects.filter(Q(is_approved=True) | Q(is_rejected=True), email_sent=False)

        for pet in pets:
            if pet.is_approved:
                
                message = f"Dear {pet.username}, \n\n" \
                          f"Your pet '{pet.name}' has been approved. Thank you! \n\n " \
                          f"Best regards, \nYour Pet Adoption Team - Pawdoption"    
                

                send_mail(
                    subject='Congratulations!',
                    message=message,
                    from_email=settings.EMAIL_HOST_USER, 
                    recipient_list=[pet.email], 
                    fail_silently=False,
                )

            if pet.is_rejected:
                
                message = f"Dear {pet.username}, \n\n" \
                          f"Unfortunately, your pet '{pet.name}' has been rejected. Please contact us for more information. \n\n " \
                          f"Best regards, \nYour Pet Adoption Team - Pawdoption"
                 
                send_mail(
                    subject='Sorry for the Inconvenience',
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,  
                    recipient_list=[pet.email], 
                    fail_silently=False,
                )

            pet.email_sent = True
            pet.save()

        self.stdout.write(self.style.SUCCESS('Emails sent successfully'))