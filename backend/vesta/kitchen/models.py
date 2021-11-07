from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

# Create your models here.

class Profile(models.Model):
  user = models.OneToOneField(
    User,
    on_delete=models.CASCADE
  )
  age = models.IntegerField(default=None)
  sex = models.CharField(max_length=1, default=None) # 'M' for Male, 'F' for Female
  height = models.IntegerField(default=None)
  weight = models.IntegerField(default=None)

class Menu(models.Model):
    name = models.CharField(max_length = 32)
    calories = models.IntegerField()
    carbs = models.IntegerField()
    protein = models.IntegerField()
    fat = models.IntegerField()
    image = models.ImageField(upload_to = 'images', blank = True)


#### model 'Preference' consists of two foreign key field ####
####                  : User, Menu                        ####
class Preference(models.Model):
  user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='preference_list'
  )
  menu = models.ForeignKey(
    Menu,
    on_delete=models.CASCADE  # is it also should be delete
  )                           # when the related menu has been deleted?


#### it must be better to rename this Model
#### EX) DateNutrition, Nutrition
class UserNutrition(models.Model):
  user= models.ForeignKey(
    User,
    on_delete=models.CASCADE
  )
  date = models.DateField()
  calories = models.IntegerField()
  carbs = models.IntegerField()
  protein = models.IntegerField()
  fat = models.IntegerField()
