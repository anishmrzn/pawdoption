# Generated by Django 5.0.1 on 2024-01-20 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paws', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pets',
            name='age',
            field=models.TextField(blank=True, max_length=50),
        ),
    ]