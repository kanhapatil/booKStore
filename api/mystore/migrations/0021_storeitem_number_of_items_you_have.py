# Generated by Django 5.0.3 on 2024-04-22 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mystore', '0020_alter_reviewitem_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='storeitem',
            name='Number of items you have',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
