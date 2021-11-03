from django.db import models
from django.db.models.fields import BooleanField, CharField, DateField, IntegerField, TextField
from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import User

# Create your models here.
class Menu(models.Model):
    name = CharField(max_length = 32)
    calories = IntegerField()
    carbs = IntegerField()
    protein = IntegerField()
    fat = IntegerField()

class Recipe(models.Model):
    menu_id = ForeignKey(Menu, on_delete = models.CASCADE, related_name = 'menu_of_recipe')
    recipe = TextField()

class Record(models.Model):
    user_id = ForeignKey(User, on_delete = models.CASCADE, related_name = 'creator_of')
    menu_id = ForeignKey(Menu, on_delete = models.CASCADE, related_name = 'menu_of_record')
    recipe_id = ForeignKey(Recipe, on_delete = models.CASCADE, related_name = 'recipe_of')
    review = TextField()
    liked = BooleanField()
    date = DateField()