from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class EmissionTransportation(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    automobile_emission = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    railway_emission = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    aviation = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    aquatic_emission = models.DecimalField(default= 0, max_digits=10, decimal_places=4)

class EmissionEnergy(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    electricity_emission  = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    waterandgas_emission = models.DecimalField(default= 0, max_digits=10, decimal_places=4)

class EmissionDiet(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    food_emission = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    beverages_emission = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    username = models.ForeignKey(User, on_delete=models.CASCADE)

class Complaints (models.Model):
    complaintTitle = models.CharField(max_length=200)
    fileDate = models.DateField()
    # complaintType = models.CharField(max_length=15)
    # authority = models.CharField(max_length=15)
    area = models.CharField(max_length=15)
    content = models.CharField(max_length=500)


class Blogs (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
    blogTitle = models.CharField(max_length=200)
    publishDate = models.DateField()
    author = models.CharField(max_length=15)
    content = models.CharField(max_length=1500)
    category = models.CharField(max_length=255,default='b')

class Issues (models.Model):
    issueName = models.CharField(max_length=15)
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
    disasterDate = models.DateField()
    province = models.CharField(max_length=15)
    District = models.CharField(max_length=15)
    affectedArea = models.CharField(max_length=15)
    issueDescription = models.CharField(max_length=500)
    expectedSolution = models.CharField(max_length=200)

class Project(models.Model):
    projectTitle = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
    progress = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    helddate = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    contributors = models.JSONField()
    tasks = models.JSONField()
    timeline = models.JSONField(default=dict)
    
# class Issues (models.Model):
#     owner = models.ForeignKey(User, related_name='issues', on_delete=models.CASCADE,null=True)
#     issueName = models.CharField(max_length=15)
#     disasterDate = models.DateField(editable=False)
#     province = models.CharField(max_length=15)
#     District = models.CharField(max_length=15)
#     affectedArea = models.CharField(max_length=15)
#     issueDescription = models.CharField(max_length=500)
#     expectedSolution = models.CharField(max_length=200)

class Flood (models.Model):
    prediction = models.CharField(max_length=1)
    temp_avg = models.DecimalField(max_digits=3,decimal_places=1)
    rainfall_sum = models.DecimalField(max_digits=4,decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)

class FloodImpact (models.Model):
    floodprediction = models.CharField(max_length=1)
    tempAvg = models.DecimalField(max_digits=3,decimal_places=1)
    rainSum = models.DecimalField(max_digits=4,decimal_places=1)
    impactRange = models.CharField(max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)

class LandslideImpact (models.Model):
    slideprediction = models.CharField(max_length=1)
    temp_max = models.DecimalField(max_digits=3,decimal_places=1)
    temp_min = models.DecimalField(max_digits=3,decimal_places=1)
    rainSum = models.DecimalField(max_digits=4,decimal_places=1)
    damaged_houses = models.CharField(max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)

class ThunderImpact (models.Model):
    thunderprediction = models.CharField(max_length=1)
    temp_max = models.DecimalField(max_digits=3,decimal_places=1)
    temp_min = models.DecimalField(max_digits=3,decimal_places=1)
    rainSum = models.DecimalField(max_digits=4,decimal_places=1)
    victims = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class StrongwindImpactModel (models.Model):
    windprediction = models.CharField(max_length=1)
    wind_speed = models.DecimalField(max_digits=4,decimal_places=1)
    temp_max = models.DecimalField(max_digits=3,decimal_places=1)
    temp_min = models.DecimalField(max_digits=3,decimal_places=1)
    damaged_houses = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
class Guidance(models.Model):
    disaster = models.CharField(max_length=10)
    moment = models.CharField(max_length = 10)
    action = models.CharField(max_length=1000)

class UserDetailsSetup(models.Model):
    owner = models.ForeignKey(User, related_name='userdetailssetup', on_delete=models.CASCADE,null=True)
    province = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    telephoneNumber = models.BigIntegerField()

class DisasterNotification(models.Model):
    message = models.TextField(max_length=200)
    owner = models.BigIntegerField()
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def mark_as_read(self):
        self.is_read = True
        self.save()



class EmergencyRelief (models.Model):
    location = models.CharField(max_length=100)
    longitude =models.FloatField()
    latitude = models.FloatField()
    flood = models.BooleanField()
    landslide = models.BooleanField()
    strongwind = models.BooleanField()


class AuthorityContact(models.Model):
   
   affectedArea = models.CharField(max_length=30)
   message = models.CharField(default="Emergency alert",max_length=50)
   userphone = models.BigIntegerField()
   is_seen = models.BooleanField(default=False)
   respondingMessage = models.CharField(max_length=200,default="Notification: Rescue Operation LaunchedWe want to inform you that a rescue operation is now underway, and our team is en route to your location. Rest assured, we are working swiftly to reach you as soon as possible.")

   def mark_as_read(self):
       self.is_seen = True
       self.save()
    
class Location(models.Model):
    locationName = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    description = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.locationName


class StrongWindInstances (models.Model):
    prediction = models.CharField(max_length=1)
    temp_max = models.DecimalField(max_digits=4,decimal_places=1)
    wind_speed = models.DecimalField(max_digits=3,decimal_places=1)
    temp_min= models.DecimalField(max_digits=4,decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)

class Landslide (models.Model):
    prediction = models.CharField(max_length=1)
    temp_min = models.DecimalField(max_digits=4,decimal_places=1)
    temp_max = models.DecimalField(max_digits=4,decimal_places=1)
    rainSUm = models.DecimalField(max_digits=4,decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)

class Thunder (models.Model):
    prediction = models.CharField(max_length=1)
    temp_min = models.DecimalField(max_digits=4,decimal_places=1)
    temp_max = models.DecimalField(max_digits=4,decimal_places=1)
    rainSUm = models.DecimalField(max_digits=4,decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Define a ForeignKey relationship to the User model
    desc = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)
    mean_green_value = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    points_assigned = models.IntegerField(blank=True, null=True)

    def str(self):
        return f'{self.user.username} - {self.created_at}'
class EmissionSetup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    people_count = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    veh_emi = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    bulb_type = models.CharField(max_length=255)
    bulb_count = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    ac_btu = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    ac_count = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    ac_type = models.CharField(max_length=255)
    refrigerator_power = models.DecimalField(default= 0, max_digits=10, decimal_places=4)
    gas_duration = models.DecimalField(default= 0, max_digits=10, decimal_places=4)