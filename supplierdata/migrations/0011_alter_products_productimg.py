# Generated by Django 5.0.1 on 2024-01-27 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplierdata', '0010_alter_products_productimg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='productImg',
            field=models.ImageField(blank=True, upload_to='', verbose_name='images/'),
        ),
    ]
