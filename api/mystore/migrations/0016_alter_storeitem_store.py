# Generated by Django 5.0.3 on 2024-04-02 02:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mystore', '0015_rename_image_mystore_image1_mystore_image2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storeitem',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='storeItem', to='mystore.mystore'),
        ),
    ]
