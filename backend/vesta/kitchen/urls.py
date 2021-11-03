from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
    path('user/', views.user, name='user'),
    path('record/', views.record, name='record'),
    path('record/<int:record_id>/', views.recordID, name='recordID'),
    path('record/user/<int:user_id>/', views.recordUserID, name='recordUserID'),
    path('record/<int:record_id>/review/', views.review, name='review'),
    path('recipe/<str:menu_name>/', views.recipeMenuName, name='recipeMenuName'),
    path('menu/', views.menu, name='menu'),
    path('menu/<str:menu_name>/', views.menuName, name='menuName'),
    path('token/', views.token, name='token'),
]