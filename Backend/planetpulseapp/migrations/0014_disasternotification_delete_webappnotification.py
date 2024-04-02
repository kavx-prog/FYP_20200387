# Generated by Django 4.1.9 on 2023-08-28 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0013_alter_webappnotification_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='DisasterNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(max_length=200)),
                ('owner', models.BigIntegerField()),
                ('is_read', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.DeleteModel(
            name='WebAppNotification',
        ),
    ]