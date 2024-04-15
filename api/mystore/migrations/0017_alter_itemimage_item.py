# Generated by Django 5.0.3 on 2024-04-06 07:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mystore', '0016_alter_storeitem_store'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemimage',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item_images', to='mystore.storeitem'),
        ),
    ]