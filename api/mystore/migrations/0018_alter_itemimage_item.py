# Generated by Django 5.0.3 on 2024-04-06 07:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mystore', '0017_alter_itemimage_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemimage',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='itemImages', to='mystore.storeitem'),
        ),
    ]
