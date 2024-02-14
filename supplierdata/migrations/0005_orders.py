# Generated by Django 5.0.1 on 2024-02-14 09:35

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplierdata', '0004_alter_products_sellerid'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('orderId', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.PositiveIntegerField()),
                ('delivery_status', models.CharField(choices=[('delivered', 'Delivered'), ('pending', 'Pending')], default='pending', max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('products', models.ManyToManyField(to='supplierdata.products')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]