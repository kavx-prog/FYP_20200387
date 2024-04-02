# Generated by Django 4.1.9 on 2023-05-25 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planetpulseapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Blogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blogTitle', models.CharField(max_length=200)),
                ('publishDate', models.DateField()),
                ('author', models.CharField(max_length=15)),
                ('content', models.CharField(max_length=500)),
            ],
        ),
    ]