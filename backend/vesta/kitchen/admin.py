from django.contrib import admin

from .models import Preference, UserNutrition, Profile, Menu

# Register your models here.

admin.site.register(Profile)
admin.site.register(Menu)
admin.site.register(UserNutrition)
admin.site.register(Preference)
