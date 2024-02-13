# Generated by Django 5.0.1 on 2024-02-13 05:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paws', '0010_remove_pets_ownerid_pets_username_alter_pets_owner'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pets',
            name='owner',
        ),
        migrations.AddField(
            model_name='pets',
            name='ownerId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
