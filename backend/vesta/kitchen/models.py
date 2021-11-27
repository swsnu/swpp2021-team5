from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey, OneToOneField
from django.db.models.fields import BooleanField, CharField, DateField, IntegerField, TextField, FloatField

# Create your models here.

class Menu(models.Model):
    name = CharField(max_length = 150)
    calories = FloatField()
    carbs = FloatField()
    protein = FloatField()
    fat = FloatField()
    image = models.ImageField(upload_to = 'menu_images', blank = True)
    recipe = TextField(default="")
    ingredient = TextField(default="")

class Profile(models.Model):
    user = OneToOneField(
        User,
        null=True,                      # should be revised to => 'null=False'
        on_delete=models.CASCADE
    )
    age = IntegerField(null=True)
    sex = BooleanField(null=True) # 'M' for Male, 'F' for Female
    height = IntegerField(null=True)
    weight = IntegerField(null=True)
    target_calories = IntegerField(null=True)

#### model 'Preference' consists of two foreign key field ####
####                  : User, ingredient                  ####
class Preference(models.Model):
    user = ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='preference_list'
    )
    ingredient = TextField(default="")

#### it must be better to rename this Model
#### EX) DateNutrition, Nutrition
class UserNutrition(models.Model):
    user= ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    date = DateField()
    calories = FloatField()
    carbs = FloatField()
    protein = FloatField()
    fat = FloatField()
    count_all = IntegerField(default=0)

class Record(models.Model):
    user = ForeignKey(User, on_delete = models.CASCADE, related_name = 'creator_of')
    menu = ForeignKey(Menu, on_delete = models.CASCADE, related_name = 'menu_of_record')
    review = TextField()
    liked = BooleanField()
    date = DateField()
    image = models.ImageField(upload_to = 'record_images', blank = True)