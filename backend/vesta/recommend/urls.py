from django.urls import path
from . import views

urlpatterns = [
    path('<str:date>/', views.recommend, name='recommend'),
]
