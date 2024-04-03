from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets,generics
from .serializers import RegisterSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import AuthorityContact
from .models import EmergencyRelief
from .models import Guidance
from .models import Complaints,UserDetailsSetup,Thunder,ThunderImpact,EmissionSetup
from .serializers import GuidanceSerializer
from .serializers import UserDetailsSerializer,DisasterNotificationSerializer
from .serializers import ComplaintSerializer,FloodImpactSerializer,UserDetailsSerializer, EmergencyActionSerializer,ThunderImpactSerializer
import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.views import APIView
from joblib import load
import os
import numpy as np
from celery import shared_task
from .models import Flood,FloodImpact,UserDetailsSetup,DisasterNotification, EmergencyRelief, EmissionTransportation, EmissionEnergy, EmissionDiet
from .serializers import AuthorityContactSerializer, TransportationEmissionSerializer, EnergyEmissionSerializer, DietEmissionSerializer,EmissionSetupSerializer
import schedule
from datetime import datetime, timedelta
from django.http import JsonResponse
# from notifications.signals import notify
from django.contrib.auth.models import User
from rest_framework import status
from .models import Location
from .serializers import LocationSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
import numpy as np
import math


# from django_background_tasks import background

mlmodels_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'mlModels'))

# Add the mlmodels directory to sys.path (if needed)


# Load the joblib file from the mlmodels directory
model = load(os.path.join(mlmodels_path, 'floodPredictionModel.joblib'))
impactModel = load(os.path.join(mlmodels_path, 'impactAssessment.joblib'))
thundermodel = load(os.path.join(mlmodels_path,'thunderModel.joblib'))
thunderimpactModel = load(os.path.join(mlmodels_path,'ThunderDamageKNN.joblib'))

class EmissionSetupViewSet (viewsets.ModelViewSet):
    queryset = EmissionSetup.objects.all()
    serializer_class = EmissionSetupSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]

class TransportationEmissionViewSet (viewsets.ModelViewSet):
    queryset = EmissionTransportation.objects.all()
    serializer_class = TransportationEmissionSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]

class EnergyEmissionViewSet (viewsets.ModelViewSet):
    queryset = EmissionEnergy.objects.all()
    serializer_class = EnergyEmissionSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]

class DietEmissionViewSet (viewsets.ModelViewSet):
    queryset = EmissionDiet.objects.all()
    serializer_class = DietEmissionSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]

class ComplaintViewSet (viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]

class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response(response_data)
    
@api_view(['GET'])
def process_AQI(request,lat,longi):
    
    lat = float(lat)
    longi = float(longi)
    url = f'https://api.breezometer.com/air-quality/v2/current-conditions?lat={lat}&lon={longi}&key=c14cb11ce7d94a5ea4cc6a6f9c3940ea&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information'
    response = requests.get(url)
    data = response.json()
    return Response(data)
from rest_framework.exceptions import ParseError
class LogoutCustomView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            print(token)
            token.blacklist()
        except Exception as e:
            error_message = str(e) if str(e) else 'An error occurred'
            return Response({'error': error_message}, status=400)

        return Response({'message': 'Logout successful'}, status=200)

class UserDetailsViewSet (viewsets.ModelViewSet):
    queryset = UserDetailsSetup.objects.all()
    serializer_class = UserDetailsSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# @api_view(['GET'])
def average_temperature():
    
    # lat = float(lat)
    # longi = float(longi)
    # url = f'https://api.breezometer.com/air-quality/v2/current-conditions?lat={lat}&lon={longi}&key=aea09a0ec1f44fbda808415209c178be&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information'
    # response = requests.get(url)
    # data = response.json()
    # return Response(data)
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto')
    data = response.json()
    # Response(data['daily'])
    data = data['daily']
    daily_averages = []
    for i in range(len(data['time'])):
        max_temp = data['temperature_2m_max'][i]
        min_temp = data['temperature_2m_min'][i]
        average_temp = (max_temp + min_temp) / 2
        daily_averages.append(average_temp)
    # print(daily_averages)
    temp_overall_average = round(np.mean(daily_averages),1)
    # print(temp_overall_average)
    return temp_overall_average

# print(average_temperature())

# def flood(request):
#     floodPrediction()
def rainfallSum():
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto')
    data = response.json()
    data= data['daily']

    data=data['precipitation_sum']
    rain_sum_avg = round(np.mean(data),1)
    return rain_sum_avg
print(rainfallSum())

def windSpeedSum():
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=windspeed_10m_max&timezone=auto')
# print(rainfallSum())')
    data = response.json()
    data= data['daily']

    data=data['windspeed_10m_max']
    wind_avg = round(np.mean(data),1)
    return wind_avg


def evapotranspiration():
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=et0_fao_evapotranspiration&timezone=auto'
                            )
# print(rainfallSum())')
    data = response.json()
    data= data['daily']

    data=data['et0_fao_evapotranspiration']
    evap_avg = round(np.mean(data),1)
    return evap_avg

def temp_max_avg ():
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto')
# print(rainfallSum())')
    data = response.json()
    data= data['daily']

    data=data['temperature_2m_max']
    tempmax_avg = round(np.mean(data),1)
    return tempmax_avg

def temp_min_avg ():
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto')
# print(rainfallSum())')
    data = response.json()
    data= data['daily']

    data=data['temperature_2m_min']
    tempmin_avg = round(np.mean(data),1)
    return tempmin_avg
# @shared_task
def floodForecast():
    temp_avg = average_temperature()
    rainfall_sum = rainfallSum()
    prediction = model.predict([[rainfall_sum,temp_avg]])
    # flood_data = {'temp_avg':temp_avg, 'rainfall_sum':rainfall_sum,'prediction':predictions}
    # print(flood_data)
    # serializer = FloodSerializer(data=flood_data)
    # if serializer.is_valid():
    #     serializer.save()
   
    prediction_instance = Flood(
            temp_avg=temp_avg,
            rainfall_sum=rainfall_sum,
            prediction=prediction
        )
    prediction_instance.save()
    return prediction_instance


def ThunderForecast():
    rain_sum = rainfallSum()
    temp_max = temp_max_avg()
    temp_min = temp_min_avg()
    
    prediction = thundermodel.predict([[rain_sum,temp_max,temp_min]])
    
    prediction_instance = Thunder(
            
            rainSUm= rain_sum,
            temp_min= temp_min,
            temp_max=temp_max,
            prediction=prediction
    )
    prediction_instance.save()
    return prediction_instance


####################### Models are scheduled to run at the begining of every week (Sunday 12.00 a.m) #########################
# floodForecast()
# schedule.every().sunday.at('00.00').do(floodForecast)
# schedule.every(1).minutes.do(floodForecast)
# while True:
#     schedule.run_pending()
#     time.sleep(1)
def floodImpact():
    pred = floodForecast()
    if pred.prediction == [0]:
        impact = impactModel.predict([[pred.temp_avg,pred.rainfall_sum]])
        impact_instance = FloodImpact(
            floodprediction = pred.prediction,
            tempAvg = pred.temp_avg,
            rainSum = pred.rainfall_sum,
            impactRange = impact
        )
        impact_instance.save()
        users_in_ratnapura = UserDetailsSetup.objects.filter(district="Ratnapura")  # Adjust the field name accordingly

        # Notify.lk API endpoint and credentials
        notifylk_url = 'https://app.notify.lk/api/v1/send'
        # api_key = 'ZVJvh0Dr9jvo3cbdMHBr'  # Replace with your actual API key
        api_key = 'ROQP9uElHwXsxQWVR0kC'
        user_id = '25600'
        sender_id="NotifyDEMO"
        
        if impact_instance.impactRange == [0]:
            individuals = "0 - 335"
            risk = "LOW"
        elif impact_instance.impactRange == [1]:
            individuals = "335 - 3005"
            risk = "MEDIUM"
        elif impact_instance.impactRange == [2]:
            individuals = "335 - 14650"
            risk = "HIGH"
        else:
            individuals = "more than 14650"
            risk = "VERY HIGH"
        


        # Iterate through users and send SMS
        for user in users_in_ratnapura:
            
            # message = "Flood impact prediction indicates low risk."
            # # notification = WebAppNotification.objects.create(owner=user.owner_id,message=message)
            # # NotificationSerializer(notification)

            # notification = WebAppNotification(
            #     owner = user.owner_id,
            #     message = message
            # )

            # notification.save()
            # # Serialize the notification and return the response
            
            messagenoti = "Emergency Disaster Alert"
            notification = DisasterNotification(
                message = messagenoti,
                owner = user.owner_id, 
            )

            notification.save()
    
            today = datetime.now().date()
            sixth_day = today + timedelta(days=6)
            # evacuation = EmergencyRelief.objects.filter(flood=True)
            # evacuation_list = "\n - ".join(evacuation)
            # evacutaionRoutes = EmergencyRelief.objects.filter(flood=True)
            # evacuation_list = "\n - ".join(evacutaionRoutes)
            # print(evacutaionRoutes)
            message = (f"Flood Impact Alert: Possibility of flood in Ratnapura District ({today} to {sixth_day})."
            f"\nFlood risk is {risk} , and the potential affecting count may {individuals}. "
            f"\nTo ensure safety from the Earthquake, individuals can consider visiting the following locations:"
            f"\n -Chiththa Wiweka Aranya Senasanaya"
            f"\nFollow local authorities' advice. Stay prepared and vigilant.")
            
            
            phone_number = user.telephoneNumber  # Adjust the field name accordingly
            
            # Send SMS using the Notify.lk API
            payload = {
                'user_id':user_id,
                'api_key': api_key,
                'sender_id':sender_id,
                'to': phone_number,
                'message': message
            }
            response = requests.post(notifylk_url, data=payload)

            # Print the response for debugging (optional)
            print(f"SMS sent to {phone_number}. Response: {response.text}")

####################### Models are scheduled to run at the begining of every week (Sunday 12.00 a.m) #########################
# ThunderForecast()
# schedule.every().sunday.at('00.00').do(ThunderForecast)
# schedule.every(1).minutes.do(ThunderForecast)
# while True:
#     schedule.run_pending()
#     time.sleep(1)


def thunderImpact():
    pred = ThunderForecast()
    if pred.prediction == [0]:
        thunderimpact = thunderimpactModel.predict([[pred.rainSUm,pred.temp_max,pred.temp_min]])
        thunderimpact = np.array(thunderimpact)

# Ceil the values in the array  
        thunderimpact = np.round(thunderimpact)
        thunderimpact =str(int(thunderimpact))
        impact_instance = ThunderImpact(
            thunderprediction = pred.prediction,
            temp_max = pred.temp_max,
            temp_min = pred.temp_min,
            rainSum = pred.rainSUm,
            victims = thunderimpact
        )
        impact_instance.save()
        users_in_ratnapura = UserDetailsSetup.objects.filter(district="Ratnapura")  # Adjust the field name accordingly

        # Notify.lk API endpoint and credentials
        notifylk_url = 'https://app.notify.lk/api/v1/send'
        # api_key = 'ZVJvh0Dr9jvo3cbdMHBr'  # Replace with your actual API key
        api_key = 'ROQP9uElHwXsxQWVR0kC'
        user_id = '25600'
        sender_id="NotifyDEMO"
        
        


        # Iterate through users and send SMS
        for user in users_in_ratnapura:
            
            # message = "Flood impact prediction indicates low risk."
            # # notification = WebAppNotification.objects.create(owner=user.owner_id,message=message)
            # # NotificationSerializer(notification)

            # notification = WebAppNotification(
            #     owner = user.owner_id,
            #     message = message
            # )

            # notification.save()
            # # Serialize the notification and return the response
            
            messagenoti = "Emergency Disaster Alert"
            notification = DisasterNotification(
                message = messagenoti,
                owner = user.owner_id, 
            )

            notification.save()
    
            today = datetime.now().date()
            sixth_day = today + timedelta(days=6)
            # evacuation = EmergencyRelief.objects.filter(flood=True)
            # evacuation_list = "\n - ".join(evacuation)
            # evacutaionRoutes = EmergencyRelief.objects.filter(flood=True)
            # evacuation_list = "\n - ".join(evacutaionRoutes)
            # print(evacutaionRoutes)
            message = (f"Thunderstorm Impact Alert: Possibility of Thunderstorm in Ratnapura District ({today} to {sixth_day})."
            f"\nPotential damaging houses may  {thunderimpact}. "
            f"\nFollow local authorities' advice. Stay prepared and vigilant.")
            
            
            phone_number = user.telephoneNumber  # Adjust the field name accordingly
            
            # Send SMS using the Notify.lk API
            payload = {
                'user_id':user_id,
                'api_key': api_key,
                'sender_id':sender_id,
                'to': phone_number,
                'message': message
            }
            response = requests.post(notifylk_url, data=payload)

            # Print the response for debugging (optional)
            print(f"SMS sent to {phone_number}. Response: {response.text}")


# Runs the Impact and sends SMS
# floodImpact()
# thunderImpact()

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_notifications(request):
    user = request.user
    notifications = DisasterNotification.objects.filter(owner=user.id).order_by('-timestamp')
    serializer = DisasterNotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def mark_notification_as_read(request, notification_id):
    try:
        notification = DisasterNotification.objects.get(id=notification_id)
        if notification.owner == request.user.id:
            notification.mark_as_read()
            return Response({'detail': 'Notification marked as read.'})
        else:
            return Response({'detail': 'You are not authorized to mark this notification as read.'})
    except DisasterNotification.DoesNotExist:
        return Response({'detail': 'Notification not found.'})

@api_view(['GET'])
def warningAlerts(request):
    # warning = floodImpact()
    # return Response(warning.json())
    try:
        last_record = FloodImpact.objects.latest('id') 
         # Assuming 'id' is the primary key field
        if last_record.floodprediction == '[0]':
            serializer = FloodImpactSerializer(last_record)
            return Response(serializer.data)
        else:
            response_data = 0
            return Response(response_data)
    except FloodImpact.DoesNotExist:
        return Response({"message": "No records found"}, status=404)

    
@api_view(['GET'])
def ThunderWarningAlerts(request):
    # warning = floodImpact()
    # return Response(warning.json())
    try:
        last_record = ThunderImpact.objects.latest('id') 
         # Assuming 'id' is the primary key field
        if last_record.thunderprediction == '[0]':
            serializer = ThunderImpactSerializer(last_record)
            return Response(serializer.data)
        else:
            response_data = 0
            return Response(response_data)
    except ThunderImpact.DoesNotExist:
        return Response({"message": "No records found"}, status=404)

@api_view(['GET'])
def getChartDataFlood(request):
    # warning = floodImpact()
    # return Response(warning.json())
    try:
        last_record = Flood.objects.latest('id') 
         # Assuming 'id' is the primary key field
        if last_record.prediction == '[0]':
            floodDate = last_record.created_at.date()
            six =  floodDate + timedelta(days=6)
            url = f'https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=precipitation_sum&timezone=auto&start_date={floodDate}&end_date={six}'
            response = requests.get(url)
            data = response.json()
            return Response(data)
        else:
            response_data = 0
            return Response(response_data)
    except Flood.DoesNotExist:
        return Response({"message": "No records found"}, status=404)
    
class EmergencyActionView(viewsets.ModelViewSet):
    queryset = EmergencyRelief.objects.all()
    serializer_class = EmergencyActionSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes= [IsAuthenticated]
    
class GuidanceViewSet(viewsets.ModelViewSet):
    queryset = Guidance.objects.all()
    serializer_class = GuidanceSerializer

class AuthorityContactView(viewsets.ModelViewSet):
    queryset= AuthorityContact.objects.all()
    serializer_class = AuthorityContactSerializer

class LocationList(APIView):
    def post(self, request, format=None):
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def contactAuthority(request):
    user = request.user.id
    print(user)
    # 
    userDetails = UserDetailsSetup.objects.get(owner_id=user)
       
    contact = AuthorityContact(
        affectedArea=userDetails.area,
        userphone=userDetails.telephoneNumber
    )
    contact.save()
    return JsonResponse({'message': 'Contact information saved successfully'})

@api_view(['POST'])
def getAuthorityMessage(request,comid):
        notification = AuthorityContact.objects.get(id=comid)
        notification.mark_as_read()
        notifylk_url = 'https://app.notify.lk/api/v1/send'
        # api_key = 'ZVJvh0Dr9jvo3cbdMHBr'  # Replace with your actual API key
        api_key = 'eMYWMSYHPbfn1ZHPcInE'
        user_id = '25572'
        sender_id="NotifyDEMO"
        payload = {
                'user_id':user_id,
                'api_key': api_key,
                'sender_id':sender_id,
                'to': notification.userphone,
                'message':notification.respondingMessage 
            }
        response = requests.post(notifylk_url, data=payload)
        return Response(response.text)



    # contact = AuthorityContact(
    #     affectedArea = userDetails.area,
    #     userphone = userDetails.telephoneNumber
    # )
    # contact.save()

@api_view(['GET'])
def get_locations(request):
    locations = Location.objects.all()
    return Response(locations)

class ResourceLocationView(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer