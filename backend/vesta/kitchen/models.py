from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey, OneToOneField
from django.db.models.fields import BooleanField, CharField, DateField, IntegerField, TextField

# Create your models here.

class Menu(models.Model):
    name = CharField(max_length = 32)
    calories = IntegerField()
    carbs = IntegerField()
    protein = IntegerField()
    fat = IntegerField()
    image = models.ImageField(upload_to = 'menu_images', blank = True)

class Profile(models.Model):
    user = OneToOneField(
        User,
        null=True,                      # should be revised to => 'null=False'
        on_delete=models.CASCADE
    )
    age = IntegerField(null=True)
    sex = BooleanField(null=True)# 'M' for Male, 'F' for Female
    height = IntegerField(null=True)
    weight = IntegerField(null=True)

#### model 'Preference' consists of two foreign key field ####
####                  : User, Menu                        ####
class Preference(models.Model):
    user = ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='preference_list'
    )
    menu = ForeignKey(
        Menu,
        null=True,                  # should be revised to => 'null=False'
        on_delete=models.CASCADE    # is it also should be delete
    )                               # when the related menu has been deleted?

#### it must be better to rename this Model
#### EX) DateNutrition, Nutrition
class UserNutrition(models.Model):
    user= ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    date = DateField()
    calories = IntegerField()
    carbs = IntegerField()
    protein = IntegerField()
    fat = IntegerField()

class Recipe(models.Model):
    menu = ForeignKey(Menu, on_delete = models.CASCADE, related_name = 'menu_of_recipe')
    recipe = TextField()

class Record(models.Model):
    user = ForeignKey(User, on_delete = models.CASCADE, related_name = 'creator_of')
    menu = ForeignKey(Menu, on_delete = models.CASCADE, related_name = 'menu_of_record')
    recipe = ForeignKey(Recipe, on_delete = models.CASCADE, related_name = 'recipe_of')
    review = TextField()
    liked = BooleanField()
    date = DateField()
    image = models.ImageField(upload_to = 'record_images', blank = True)
