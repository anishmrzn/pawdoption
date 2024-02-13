
# Generated by Django 5.0.1 on 2024-02-13 05:02


import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paws', '0008_pets_is_rejected'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='pets',
            name='ownerId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='pets',
            name='owner',
            field=models.CharField(max_length=50, null=True),

        ),
    ]