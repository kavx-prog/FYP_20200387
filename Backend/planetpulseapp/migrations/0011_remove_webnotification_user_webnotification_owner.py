# Generated by Django 4.1.9 on 2023-08-28 16:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0010_webnotification'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='webnotification',
            name='user',
        ),
        migrations.AddField(
            model_name='webnotification',
            name='owner',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='webnotifications', to='planetpulseapp.userdetailssetup'),
            preserve_default=False,
        ),
    ]