# Generated by Django 4.1.9 on 2023-08-27 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0003_complaints_alter_blogs_content'),
    ]

    operations = [
        migrations.CreateModel(
            name='Flood',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prediction', models.CharField(max_length=1)),
                ('temp_avg', models.DecimalField(decimal_places=1, max_digits=3)),
                ('rainfall_sum', models.DecimalField(decimal_places=1, max_digits=4)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='complaints',
            name='authority',
        ),
        migrations.RemoveField(
            model_name='complaints',
            name='complaintType',
        ),
    ]
