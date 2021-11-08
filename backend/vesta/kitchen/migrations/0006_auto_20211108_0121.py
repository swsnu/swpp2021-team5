# Generated by Django 3.2.7 on 2021-11-08 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kitchen', '0005_menu_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='image',
            field=models.ImageField(blank=True, upload_to='record_images'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='image',
            field=models.ImageField(blank=True, upload_to='menu_images'),
        ),
    ]
