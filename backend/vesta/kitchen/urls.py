from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
    path('user/', views.user, name='user'),
    path('user/signup/', views.signup, name='signup'),
    path('user/signin', views.signin, name='signin'),
    path('user/signout/', views.signout, name='signout'),
    path('user/resign/', views.signout, name='resign'),
    path('user/profile/', views.profile, name='profile'),
    
    ## should revise into better way 
    path('nutrition/<int:year>/<int:month>/<int:day>/', views.nutrition, name='nutrition')
]