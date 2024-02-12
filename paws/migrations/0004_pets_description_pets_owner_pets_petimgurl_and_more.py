# Generated by Django 5.0.1 on 2024-02-11 10:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paws', '0003_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='pets',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='pets',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='pets',
            name='petImgUrl',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='pets',
            name='breed',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]