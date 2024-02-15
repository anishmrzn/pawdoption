from django.conf import settings
from paws.models import Pets
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.db.models import Q


class Command(BaseCommand):
    help = 'Sends approval or rejection emails for pets'

    def handle(self, *args, **kwargs):
        pets = Pets.objects.filter(Q(is_approved=True) | Q(is_rejected=True), email_sent=False)

        for pet in pets:
            if pet.is_approved:
                send_mail(
                    subject='Congratulations!',
                    message='Your pet form has been approved. Thank you!',
                    from_email=settings.EMAIL_HOST_USER, 
                    recipient_list=[pet.email], 
                    fail_silently=False,
                )

            if pet.is_rejected:
                send_mail(
                    subject='Sorry!',
                    message='Your pet form has been rejected. Please contact us for more information.',
                    from_email=settings.EMAIL_HOST_USER,  
                    recipient_list=[pet.email], 
                    fail_silently=False,
                )

            pet.email_sent = True
            pet.save()

        self.stdout.write(self.style.SUCCESS('Emails sent successfully'))