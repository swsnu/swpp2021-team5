from django.contrib import admin

from .models import UserNutrition, Profile, Preference

# Register your models here.

admin.site.register(Profile)
admin.site.register(Preference)
admin.site.register(UserNutrition)