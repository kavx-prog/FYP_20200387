from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import EmergencyRelief
from .serializers import EmergencyActionSerializer

#test case for fetching data from Emergency action collection(GET)
class EmergencyActionViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_emergency_relief(self):
       
        emergency_relief1 = EmergencyRelief.objects.create(location="Ratnapura Maha Wiharaya", longitude=80.3847,latitude=6.7056,flood=True,landslide=False,strongwind=True)

        response = self.client.get('/emergency/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data

        self.assertEqual(len(data), 6) 
        self.assertEqual(data[6]['location'], emergency_relief1.location)
        

