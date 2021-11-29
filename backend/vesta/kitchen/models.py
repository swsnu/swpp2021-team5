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
    api_id = IntegerField()
    api_name = TextField()
    api_token = TextField()

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

class TodayMenu(models.Model):
    user = ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    count = IntegerField(default=0)
    breakfast = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast')
    lunch = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch')
    dinner = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner')
    breakfast_other1 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast1')
    breakfast_other2 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast2')
    breakfast_other3 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast3')
    breakfast_other4 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast4')
    lunch_other1 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch1')
    lunch_other2 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch2')
    lunch_other3 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch3')
    lunch_other4 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch4')
    dinner_other1 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner1')
    dinner_other2 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner2')
    dinner_other3 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner3')
    dinner_other4 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner4')
