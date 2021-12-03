from django.forms.models import model_to_dict
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import TodayMenu
from kitchen.models import *
import datetime

# Create your tests here.
class RecommendTestClass(TestCase):
  def test_recommend_get(self):
      client = Client()
      response = client.get('/api/recommend/2021-11-11/')
      self.assertEqual(response.status_code, 401)

      user = User.objects.create(username='testuser')
      user.set_password('testpassword')
      user.save()

      client.login(username='testuser', password='testpassword')

      menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
      menu.save()

      date_list = "2021-11-11".split('-')
      today = datetime.date(int(date_list[0]), 
            int(date_list[1]), int(date_list[2]))
      today_menu = TodayMenu.objects.create(
        user=user,
        count=0,
        date=today,
        breakfast=menu,
        lunch=menu,
        dinner=menu,
        breakfast_other1=menu,
        breakfast_other2=menu,
        breakfast_other3=menu,
        breakfast_other4=menu,
        lunch_other1=menu,
        lunch_other2=menu,
        lunch_other3=menu,
        lunch_other4=menu,
        dinner_other1=menu,
        dinner_other2=menu,
        dinner_other3=menu,
        dinner_other4=menu
      )

      response = client.get('/api/recommend/2021-11-11/')
      self.assertEqual(response.status_code, 200)