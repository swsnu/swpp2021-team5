from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

# Create your models here.

class Profile(models.Model):
  user = models.OneToOneField(
    User,
    on_delete=models.CASCADE
  )
  age = models.IntegerField()
  sex = models.CharField(max_length=1) # 'M' for Male, 'F' for Female
  height = models.IntegerField()
  weight = models.IntegerField()


#### 'Preference' Model is Seperated from 'Profile'
#### Because field type 'list' does not exist
#### and it has two foreign key: User, Menu

class Preference(models.Model): 
  user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='preference_list'
  )

  """ 
  !!!! It should be processed as comments for 'migrate' temporarily !!!!
  menu = models.ForeignKey(
    Menu,
    on_delete=models.CASCADE  # is it also should be delete
  )                           # when the related menu has been deleted?
  """
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
