# Generated by Django 5.0.1 on 2024-02-15 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplierdata', '0006_products_contact_products_discounted_products_seller'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='created',
            field=models.DateField(auto_now_add=True),
        ),
    ]
