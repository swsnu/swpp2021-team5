from django.forms.models import model_to_dict
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import TodayMenu
from kitchen.models import *
import datetime
import re

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
      
    def test_recommend_get_doesnotexist(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))
        
        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=0)
        today_nutrition.save()

        idx = 0
        while idx < 10:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1
        response = client.get('/api/recommend/2021-11-11/')

        idx = 0
        while idx < 15:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1
        response = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(response.status_code, 200)

    def test_not_allowed(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')
        respose = client.delete('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 405)

    def test_recommend_get_count(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()

        idx = 0
        while idx < 15:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1

        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)

        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=0)
        today_nutrition.save()
        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)

    def test_recommend_get_count_1(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()

        idx = 0
        while idx < 15:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1
        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=1)
        today_nutrition.save()
        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)

    def test_recommend_get_count_2(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()

        idx = 0
        while idx < 15:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1
        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=2)
        today_nutrition.save()
        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)

    def test_recommend_put(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))
        respose = client.put('/api/recommend/2021-11-11/', 3, content_type='application/json')
        self.assertEqual(respose.status_code, 404)

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
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
        today_menu.save()
        respose = client.put('/api/recommend/2021-11-11/', 3, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 4, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 5, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 6, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 7, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 8, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 9, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 10, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 11, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 12, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 13, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

        respose = client.put('/api/recommend/2021-11-11/', 14, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

    def test_recommend_put_doesnotexist(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))
        respose = client.put('/api/recommend/2021-11-11/', {'idx': 3}, content_type='application/json')
        self.assertEqual(respose.status_code, 404)

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
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
          dinner_other4=None
        )
        today_menu.save()
        respose = client.put('/api/recommend/2021-11-11/', 3, content_type='application/json')
        self.assertEqual(respose.status_code, 200)

    def test_recommend_count_3(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()

        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=3)
        today_nutrition.save()

        idx = 0
        while idx < 15:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1

        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)
    
    def test_recommend_count_3_doesnotexist(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=3)
        today_nutrition.save()

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()

        today_menu = TodayMenu.objects.create(
          user=user,
          count=0,
          date=today,
          breakfast=None,
          lunch=None,
          dinner=None,
          breakfast_other1=None,
          breakfast_other2=None,
          breakfast_other3=None,
          breakfast_other4=None,
          lunch_other1=None,
          lunch_other2=None,
          lunch_other3=None,
          lunch_other4=None,
          dinner_other1=None,
          dinner_other2=None,
          dinner_other3=None,
          dinner_other4=None
        )
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)
    
    def test_recommend_interset(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()
        idx = 0
        while idx < 15:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1
        menu_intersect = Menu.objects.create(name='test_intersect', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="['test', 'test2']")
        menu_intersect.save()

        menu_not_allowed = Menu.objects.create(name='test_not_allowed', calories=10000.0, carbs=10000.0, protein=10000.0,
                                  fat=10000.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="['test', 'test2']")
        menu_not_allowed.save()

        today_nutrition = UserNutrition.objects.create(user_id=user.id, date=today, calories=0, carbs=0, protein=0, fat=0, count_all=0)
        today_nutrition.save()
        preference = Preference.objects.create(user_id=user.id, ingredient="test")  # ingredient the user does not eat
        preference.save()
        preference2 = Preference.objects.create(user_id=user.id, ingredient="test2")
        preference2.save()

        # p = []
        # preferences = Preference.objects.filter(user_id=user.id)
        # for pref in preferences:
        #         pref = model_to_dict(pref)
        #         for key, value in pref.items():
        #             if key=='id' or key=='user':
        #                 continue
        #             else:
        #                 p.append(value)
        # print(set(re.findall("'(.*?)'", menu_intersect.ingredient)))
        # print(set(p))
        # print(set(re.findall("'(.*?)'", menu_intersect.ingredient)) & set(p))

        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)
    
    def test_liked_menus(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()
        idx = 0
        while idx < 13:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1
        # test liked menus
        menu_liked = Menu.objects.create(name='menu_liked', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="['chocolate']")
        menu_liked.save()
        record_liked = Record.objects.create(user_id=user.id, menu=menu_liked, review="good", liked=True, date=today, image='./images/brownie.jpeg')
        record_liked.save()

        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)

    def test_recommend_length_smaller_than15(self):
        client = Client()
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        client.login(username='testuser', password='testpassword')

        date_list = "2021-11-11".split('-')
        today = datetime.date(int(date_list[0]), 
              int(date_list[1]), int(date_list[2]))

        menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
        menu.save()
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
        today_menu.save()
        record = Record.objects.create(user_id=user.id, menu=menu, review="good", liked=False, date=today, image='./images/brownie.jpeg')
        record.save()

        profile = Profile.objects.create(user_id=user.id, age=20, sex=True, height=180, weight=70, target_calories=2000)
        profile.save()
        idx = 0
        while idx < 10:
            menu = Menu.objects.create(name='test', calories=1.0, carbs=1.0, protein=1.0,
                                  fat=1.0, image='./images/brownie.jpeg', recipe="1. make brownie", ingredient="chocolate")
            menu.save()
            idx+=1

        respose = client.get('/api/recommend/2021-11-11/')
        self.assertEqual(respose.status_code, 200)
