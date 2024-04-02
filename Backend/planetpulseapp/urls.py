
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from planetpulseapp import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from .views import RegisterApi,LogoutCustomView,LocationList
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView
)


router = DefaultRouter()
router.register(r'complaints',views.ComplaintViewSet,basename='complaints')
router.register(r'userdetails',views.UserDetailsViewSet,basename='userdetails')
router.register(r'emergency',views.EmergencyActionView,basename='emergency')
router.register(r'guidance',views.GuidanceViewSet,basename='guidance')
router.register(r'authcontact',views.AuthorityContactView,basename='authcontact')
router.register(r'transportation',views.TransportationEmissionViewSet,basename='emission')
router.register(r'energy',views.EnergyEmissionViewSet,basename='emission')
router.register(r'diet',views.DietEmissionViewSet,basename='emission')
router.register(r'emissionsetup',views.EmissionSetupViewSet,basename='emission')
router.register(r'location',views.ResourceLocationView,basename='location')

# router.register(r'readissues', views.IssueReadOnlyViewSet, basename='readissues')
# router.register(r'issues',views.IssueViewSet,basename='issues')
# router.register(r'aqiset', views.AQIViewSet,basename='aqiset')
schema_view = get_schema_view(
    openapi.Info(
        title="PlanetWatch API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterApi.as_view()),
    path('logout/',LogoutCustomView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('process-aqi/<str:lat>/<str:longi>/', views.process_AQI, name='process-aqi'),
    path('floodpred/', views.warningAlerts, name='floodPrediction'),
    path('landslidepred/', views.LandslideWarningAlerts, name='landslidePrediction'),
    path('thunderpred/', views.ThunderWarningAlerts, name='thunderPrediction'),
    path('windpred/', views.StrongwindWarningAlerts, name='windPrediction'),
    path('notifications/', views.get_notifications, name='get_notifications'),
    path('marknotifications/<int:notification_id>/', views.mark_notification_as_read, name='mark_notification_as_read'),
    path('api/locations/', LocationList.as_view(), name='location-list'),
    path('api/locations/all/loc/', views.get_locations, name='get-location-list'),
    path('contact/', views.contactAuthority, name='contact'),
    path('makeseen/<int:comid>/', views.getAuthorityMessage, name='makeseen'),
    path('getChartFlood/', views.getChartDataFlood, name='getChartFlood'),
    path('getChartWind/', views.getChartDataWind, name='getChartWind'),
    path('getChartslide/', views.getChartDataLandslide, name='getChartslide'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger',
            cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc',
            cache_timeout=0), name='schema-redoc'),

]
