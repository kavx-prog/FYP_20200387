# Generated by Django 4.1.9 on 2024-04-03 02:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="AuthorityContact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("affectedArea", models.CharField(max_length=30)),
                ("message", models.CharField(default="Emergency alert", max_length=50)),
                ("userphone", models.BigIntegerField()),
                ("is_seen", models.BooleanField(default=False)),
                (
                    "respondingMessage",
                    models.CharField(
                        default="Notification: Rescue Operation LaunchedWe want to inform you that a rescue operation is now underway, and our team is en route to your location. Rest assured, we are working swiftly to reach you as soon as possible.",
                        max_length=200,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Complaints",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("complaintTitle", models.CharField(max_length=200)),
                ("fileDate", models.DateField()),
                ("area", models.CharField(max_length=15)),
                ("content", models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name="DisasterNotification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("message", models.TextField(max_length=200)),
                ("owner", models.BigIntegerField()),
                ("is_read", models.BooleanField(default=False)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="EmergencyRelief",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("location", models.CharField(max_length=100)),
                ("longitude", models.FloatField()),
                ("latitude", models.FloatField()),
                ("flood", models.BooleanField()),
                ("landslide", models.BooleanField()),
                ("strongwind", models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name="Flood",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("prediction", models.CharField(max_length=1)),
                ("temp_avg", models.DecimalField(decimal_places=1, max_digits=3)),
                ("rainfall_sum", models.DecimalField(decimal_places=1, max_digits=4)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="FloodImpact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("floodprediction", models.CharField(max_length=1)),
                ("tempAvg", models.DecimalField(decimal_places=1, max_digits=3)),
                ("rainSum", models.DecimalField(decimal_places=1, max_digits=4)),
                ("impactRange", models.CharField(max_length=1)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Guidance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("disaster", models.CharField(max_length=10)),
                ("moment", models.CharField(max_length=10)),
                ("action", models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name="Landslide",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("prediction", models.CharField(max_length=1)),
                ("temp_min", models.DecimalField(decimal_places=1, max_digits=4)),
                ("temp_max", models.DecimalField(decimal_places=1, max_digits=4)),
                ("rainSUm", models.DecimalField(decimal_places=1, max_digits=4)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="LandslideImpact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("slideprediction", models.CharField(max_length=1)),
                ("temp_max", models.DecimalField(decimal_places=1, max_digits=3)),
                ("temp_min", models.DecimalField(decimal_places=1, max_digits=3)),
                ("rainSum", models.DecimalField(decimal_places=1, max_digits=4)),
                ("damaged_houses", models.CharField(max_length=1)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Location",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("locationName", models.CharField(max_length=100)),
                ("city", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("latitude", models.DecimalField(decimal_places=6, max_digits=9)),
                ("longitude", models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
        migrations.CreateModel(
            name="StrongwindImpactModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("windprediction", models.CharField(max_length=1)),
                ("wind_speed", models.DecimalField(decimal_places=1, max_digits=4)),
                ("temp_max", models.DecimalField(decimal_places=1, max_digits=3)),
                ("temp_min", models.DecimalField(decimal_places=1, max_digits=3)),
                ("damaged_houses", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="StrongWindInstances",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("prediction", models.CharField(max_length=1)),
                ("temp_max", models.DecimalField(decimal_places=1, max_digits=4)),
                ("wind_speed", models.DecimalField(decimal_places=1, max_digits=3)),
                ("temp_min", models.DecimalField(decimal_places=1, max_digits=4)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Thunder",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("prediction", models.CharField(max_length=1)),
                ("temp_min", models.DecimalField(decimal_places=1, max_digits=4)),
                ("temp_max", models.DecimalField(decimal_places=1, max_digits=4)),
                ("rainSUm", models.DecimalField(decimal_places=1, max_digits=4)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="ThunderImpact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("thunderprediction", models.CharField(max_length=1)),
                ("temp_max", models.DecimalField(decimal_places=1, max_digits=3)),
                ("temp_min", models.DecimalField(decimal_places=1, max_digits=3)),
                ("rainSum", models.DecimalField(decimal_places=1, max_digits=4)),
                ("victims", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="UserDetailsSetup",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("province", models.CharField(max_length=50)),
                ("district", models.CharField(max_length=50)),
                ("area", models.CharField(max_length=50)),
                ("telephoneNumber", models.BigIntegerField()),
                (
                    "owner",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="userdetailssetup",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("projectTitle", models.CharField(max_length=255)),
                (
                    "progress",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                ("helddate", models.CharField(max_length=255)),
                ("district", models.CharField(max_length=255)),
                ("province", models.CharField(max_length=255)),
                ("location", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=255)),
                ("contributors", models.JSONField()),
                ("tasks", models.JSONField()),
                ("timeline", models.JSONField(default=dict)),
                (
                    "user",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("desc", models.TextField(blank=True, null=True)),
                (
                    "image",
                    models.ImageField(blank=True, null=True, upload_to="post_images/"),
                ),
                ("mean_green_value", models.FloatField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("points_assigned", models.IntegerField(blank=True, null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Issues",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("issueName", models.CharField(max_length=15)),
                ("disasterDate", models.DateField()),
                ("province", models.CharField(max_length=15)),
                ("District", models.CharField(max_length=15)),
                ("affectedArea", models.CharField(max_length=15)),
                ("issueDescription", models.CharField(max_length=500)),
                ("expectedSolution", models.CharField(max_length=200)),
                (
                    "user",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="EmissionTransportation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "automobile_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "railway_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "aviation",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "aquatic_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="EmissionSetup",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "people_count",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "veh_emi",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                ("bulb_type", models.CharField(max_length=255)),
                (
                    "bulb_count",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "ac_btu",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "ac_count",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                ("ac_type", models.CharField(max_length=255)),
                (
                    "refrigerator_power",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "gas_duration",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="EmissionEnergy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "electricity_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "waterandgas_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="EmissionDiet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "food_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "beverages_emission",
                    models.DecimalField(decimal_places=4, default=0, max_digits=10),
                ),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Blogs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("blogTitle", models.CharField(max_length=200)),
                ("publishDate", models.DateField()),
                ("author", models.CharField(max_length=15)),
                ("content", models.CharField(max_length=1500)),
                ("category", models.CharField(default="b", max_length=255)),
                (
                    "user",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
