# Generated by Django 4.1.9 on 2023-08-27 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0004_flood_remove_complaints_authority_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FloodImpact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floodprediction', models.CharField(max_length=1)),
                ('tempAvg', models.DecimalField(decimal_places=1, max_digits=3)),
                ('rainSum', models.DecimalField(decimal_places=1, max_digits=4)),
                ('impactRange', models.CharField(max_length=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
