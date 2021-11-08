from django.urls import path
#from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
    path('record/', views.record, name='record'),
    path('record/<int:record_id>/', views.record_id_func, name='recordID'),
    path('record/user/<int:user_id>/', views.record_user_id, name='recordUserID'),
    path('record/<int:review_record_id>/review/', views.review, name='review'),
    path('recipe/<str:menu_name_recipe>/', views.recipe_menu_name, name='recipeMenuName'),
    path('menu/', views.menu, name='menu'),
    path('menu/<str:menuname>/', views.menu_name, name='menuName'),
    path('token/', views.token, name='token'),
]
