# Generated by Django 4.2.7 on 2024-03-11 10:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mystore', '0007_alter_reviewitem_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewitem',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mystore.storeitem'),
        ),
        migrations.AlterUniqueTogether(
            name='reviewitem',
            unique_together={('user', 'item')},
        ),
    ]
