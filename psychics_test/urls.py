from django.urls import path
from psychics_test import views


urlpatterns = [
    path('', views.index),
    path('guesses.json', views.guesses)
]
