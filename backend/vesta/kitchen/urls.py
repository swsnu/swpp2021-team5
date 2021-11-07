from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
    path('user/signup/', views.signup, name='signup'),
    path('user/signin/', views.signin, name='signin'),
    path('user/signout/', views.signout, name='signout'),
    path('user/resign/', views.resign, name='resign'),
    path('user/profile/', views.profile, name='profile'),
    path('nutrition/', views.nutrition, name='nutrition'),
    path('token/', views.token, name='token')
]