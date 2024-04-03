from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Issues
from .models import Project
from .models import Blogs,Landslide,Thunder,ThunderImpact,LandslideImpact
from .models import Blogs, EmissionTransportation, EmissionEnergy, EmissionDiet,EmissionSetup
from .models import Blogs,StrongWindInstances,Landslide,Thunder,ThunderImpact,LandslideImpact,StrongwindImpactModel
from .models import Complaints , EmergencyRelief,AuthorityContact
from .models import Flood , FloodImpact , Guidance, UserDetailsSetup, DisasterNotification
from .models import Location


class EmissionSetupSerializer (serializers.ModelSerializer):
    class Meta:
        model = EmissionSetup
        fields = '__all__'

class TransportationEmissionSerializer (serializers.ModelSerializer):
    class Meta:
        model = EmissionTransportation
        fields = '__all__'

class EnergyEmissionSerializer (serializers.ModelSerializer):
    class Meta:
        model = EmissionEnergy
        fields = '__all__'

class DietEmissionSerializer (serializers.ModelSerializer):
    class Meta:
        model = EmissionDiet
        fields = '__all__'

class ComplaintSerializer (serializers.ModelSerializer):
    class Meta:
        model = Complaints
        fields = '__all__'

class BlogSerializer (serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = '__all__'

class IssueSerializer (serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = '__all__'

class ProjectSerializer (serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    # issues = serializers.PrimaryKeyRelatedField(many=True, queryset=Issues.objects.all())
    class Meta:
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

class UserDetailsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source = 'owner.id')
    class Meta :
        model = UserDetailsSetup
        fields = '__all__'

# class IssueSerializer (serializers.ModelSerializer):
#     owner = serializers.ReadOnlyField(source='owner.username')


#     class Meta:
#         model = Issues
#         fields = '__all__'

class FloodSerializer (serializers.ModelSerializer):
    class Meta:
        model = Flood
        fields = '__all__'

class StrongwindSerializer (serializers.ModelSerializer):
    class Meta:
        model = StrongWindInstances
        fields = '__all__'

class ThunderSerializer (serializers.ModelSerializer):
    class Meta:
        model = Thunder
        fields = '__all__'

class LandslideSerializer (serializers.ModelSerializer):
    class Meta:
        model = Landslide
        fields = '__all__'

class FloodImpactSerializer (serializers.ModelSerializer):
    class Meta:
        model = FloodImpact
        fields = '__all__'

class LandslideImpactSerializer (serializers.ModelSerializer):
    class Meta:
        model = LandslideImpact
        fields = '__all__'

class ThunderImpactSerializer (serializers.ModelSerializer):
    class Meta:
        model = ThunderImpact
        fields = '__all__'

class StrongwindImpactSerializer (serializers.ModelSerializer):
    class Meta:
        model = StrongwindImpactModel
        fields = '__all__'
class GuidanceSerializer (serializers.ModelSerializer):
    class Meta : 
        model = Guidance
        fields = '__all__'

class DisasterNotificationSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField(source = 'owner.owner_id')
    class Meta:
        model = DisasterNotification
        fields = '__all__'

class EmergencyActionSerializer (serializers.ModelSerializer):
    class Meta:
        model = EmergencyRelief
        fields = '__all__'

class AuthorityContactSerializer (serializers.ModelSerializer):
    class Meta:
        model = AuthorityContact
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'