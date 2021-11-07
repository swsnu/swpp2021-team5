from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
    path('user/signup/', views.signup, name='signup'),
    path('user/<int:user_id>/signin/', views.signin, name='signin'),
    path('user/<int:user_id>/signout/', views.signout, name='signout'),
    path('user/<int:user_id>/resign/', views.resign, name='resign'),
    path('user/<int:user_id>/profile/', views.profile, name='profile'),
    path('nutrition/<int:user_id>/', views.nutrition, name='nutrition')
]