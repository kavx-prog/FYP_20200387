# Generated by Django 4.1.9 on 2023-08-28 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0007_userdetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetails',
            name='telephoneNumber',
            field=models.IntegerField(),
        ),
    ]
