# Generated by Django 5.0.1 on 2024-02-18 05:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('paws', '0018_petadoption_petid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='petadoption',
            name='owner',
        ),
    ]
