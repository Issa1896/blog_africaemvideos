from django.urls import path
from .views import geolocation, text_to_speech

urlpatterns = [
    path('geolocation/', geolocation, name='geolocation'),
    path('text-to-speech/', text_to_speech, name='text_to_speech'),
    # Adicione mais URLs conforme necessário
]
