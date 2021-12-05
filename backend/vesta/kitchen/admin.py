from django.contrib import admin
from .models import Menu, Record, Preference, UserNutrition, Profile

# Register your models here.

admin.site.register(Profile)
admin.site.register(Menu)
admin.site.register(UserNutrition)
admin.site.register(Preference)
admin.site.register(Record)
