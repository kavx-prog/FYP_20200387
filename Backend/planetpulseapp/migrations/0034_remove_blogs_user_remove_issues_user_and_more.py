# Generated by Django 4.1.13 on 2024-03-17 07:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0033_blogs_category_blogs_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogs',
            name='user',
        ),
        migrations.RemoveField(
            model_name='issues',
            name='user',
        ),
        migrations.DeleteModel(
            name='Landslide',
        ),
        migrations.DeleteModel(
            name='LandslideImpact',
        ),
        migrations.RemoveField(
            model_name='project',
            name='user',
        ),
        migrations.DeleteModel(
            name='StrongwindImpactModel',
        ),
        migrations.DeleteModel(
            name='StrongWindInstances',
        ),
        migrations.DeleteModel(
            name='Blogs',
        ),
        migrations.DeleteModel(
            name='Issues',
        ),
        migrations.DeleteModel(
            name='Project',
        ),
    ]