from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey, OneToOneField
from django.db.models.fields import BooleanField, CharField, DateField, IntegerField, TextField, FloatField
from django.utils.timezone import now

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
    # api_id = IntegerField()
    # api_name = TextField()
    # api_token = TextField()

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
        on_delete=models.CASCADE,
        null=True
    )
    count = IntegerField(default=0)
    date = DateField(default=now, null=True)
    breakfast = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast', null=True)
    lunch = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch', null=True)
    dinner = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner', null=True)
    breakfast_other1 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast1', null=True)
    breakfast_other2 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast2', null=True)
    breakfast_other3 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast3', null=True)
    breakfast_other4 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='breakfast4', null=True)
    lunch_other1 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch1', null=True)
    lunch_other2 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch2', null=True)
    lunch_other3 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch3', null=True)
    lunch_other4 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='lunch4', null=True)
    dinner_other1 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner1', null=True)
    dinner_other2 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner2', null=True)
    dinner_other3 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner3', null=True)
    dinner_other4 = ForeignKey(Menu, on_delete=models.PROTECT, related_name='dinner4', null=True)
