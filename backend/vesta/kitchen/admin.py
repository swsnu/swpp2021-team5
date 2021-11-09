from django.contrib import admin
from .models import Menu, Recipe, Record

# Register your models here.
admin.site.register(Menu)
admin.site.register(Recipe)
admin.site.register(Record)
