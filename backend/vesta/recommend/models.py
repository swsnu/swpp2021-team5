from django.db import models
from django.db.models.fields.related import ForeignKey
from kitchen.models import *

# Create your models here.
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
