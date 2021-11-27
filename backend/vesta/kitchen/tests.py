import datetime
import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Menu, Preference, Record, Profile, UserNutrition

# Create your tests here.
class KitchenTestClass(TestCase):

    ## test api/record/
    def test_record(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        Record.objects.create(user=user, menu=menu1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/record/')
        self.assertEqual(response.status_code, 401)
        
        ## if client is signed in, response to GET request should be 200 with correct content
        response = client2.get('/api/record/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('[{"id": 1, "user_id": 1, "menu_id": 1, "review": "review1", "liked": true, "date": "2021-11-01", "image": "./record_images/brownie.jpeg"}]',response.content.decode())


        ## POST TEST
        ## if client is not signed in, response to POST request should be 401
        response = client1.post('/api/record/')
        self.assertEqual(response.status_code, 401)

        ## if client is signed in, response to POST request should be 200 with correct content
        response = client2.post('/api/record/', {'menu': 'testmenu', 'review': 'review2', 'liked': 'False', 'date': '2021-11-11', 'image': './record_images/brownie.jpeg'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 2, "user_id": 1, "menu_id": 1, "review": "review2", "liked": false, "date": "'+ datetime.date.today().strftime("%Y-%m-%d")+'", "image": "/record_images/brownie.jpeg"}', response.content.decode())


        ## NOT GET, POST TEST
        response = client2.put('/api/record/')
        self.assertEqual(response.status_code, 405)


    ## test api/record/<int:record_id>/
    def test_record_id(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        Record.objects.create(user=user, menu=menu1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/record/1/')
        self.assertEqual(response.status_code, 401)
        
        ## if matching record id does not exist, response should be 404
        response = client2.get('/api/record/2/')
        self.assertEqual(response.status_code, 404)

        ## correct response test
        response = client2.get('/api/record/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "review": "review1", "liked": true, "date": "2021-11-01", "image": "/record_images/brownie.jpeg"}', response.content.decode())


        ## NOT GET TEST
        response = client1.post('/api/record/1/')
        self.assertEqual(response.status_code, 405)


    ## test /api/record/user/<int:user_id>/
    def test_record_user_id(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        Record.objects.create(user=user, menu=menu1, 
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/record/user/1/')
        self.assertEqual(response.status_code, 401)

        ## if record whose user is user_id does not exist, response should be 404
        response = client2.get('/api/record/user/2/')
        self.assertEqual(response.status_code, 404)

        ## correct response test
        response = client2.get('/api/record/user/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('[{"id": 1, "user_id": 1, "menu_id": 1, "review": "review1", "liked": true, "date": "2021-11-01", "image": "./record_images/brownie.jpeg"}]', response.content.decode())



    ## test /api/record/<int:review_record_id>/review/
    def test_review(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        user2 = User.objects.create(username='testuser2')
        
        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        Record.objects.create(user=user, menu=menu1, 
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')
        Record.objects.create(user=user2, menu=menu1, 
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## NOT GET, POST, PUT, DELETE TEST
        response = client1.patch('/api/record/1/review/')
        self.assertEqual(response.status_code, 405)

        ## GET TEST
        response = client2.get('/api/record/1/review/')
        self.assertEqual('{"review": "review1"}', response.content.decode())

        ## POST TEST
        response = client1.post('/api/record/1/review/')
        self.assertEqual(response.status_code, 401)
        
        response = client2.post('/api/record/100/review/')
        self.assertEqual(response.status_code, 404)
        
        response = client2.post('/api/record/2/review/')
        self.assertEqual(response.status_code, 403)
        
        response = client2.post('/api/record/1/review/', {'review': 'newReview'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "review": "newReview", "liked": true, "date": "2021-11-01", "image": "/record_images/brownie.jpeg"}', response.content.decode())

        ## PUT TEST
        response = client2.put('/api/record/1/review/', {'review': 'editReview'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "review": "editReview", "liked": true, "date": "2021-11-01", "image": "/record_images/brownie.jpeg"}', response.content.decode())

        ## DELETE TEST
        response = client2.delete('/api/record/1/review/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "review": "", "liked": true, "date": "2021-11-01", "image": "/record_images/brownie.jpeg"}', response.content.decode())


    ## test api/record/<int:liked_record_id>/liked/
    def test_liked(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        user2 = User.objects.create(username='testuser2')
        user2.set_password('testpassword2')
        user2.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        Record.objects.create(user=user, menu=menu1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')
        Record.objects.create(user=user2, menu=menu1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## PUT TEST
        ## if client is not signed in, response should be 401
        response = client1.put('/api/record/1/liked/')
        self.assertEqual(response.status_code, 401)

        ## if record of id liked_record_id does not exist, response should be 404
        response = client2.put('/api/record/3/liked/')
        self.assertEqual(response.status_code, 404)

        ## if request is not from the author of record, response should be 403
        response = client2.put('/api/record/2/liked/')
        self.assertEqual(response.status_code, 403)

        ## correct response test
        response = client2.put('/api/record/1/liked/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "review": "review1", "liked": false, "date": "2021-11-01", "image": "/record_images/brownie.jpeg"}', response.content.decode())

    ## test api/menu/
    def _test_menu(self):  ## error in this test, please correct its name and make it pass
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                            fat=1, image='./images/brownie.jpeg')

        
        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/menu/')
        self.assertEqual(response.status_code, 401)

        ## correct response test
        response = client2.get('/api/menu/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('[{"id": 1, "name": "testmenu", "calories": 1, "carbs": 1, "protein": 1, "fat": 1, "image": "./images/brownie.jpeg"}]', response.content.decode())


    ## test api/menu/<str:menuname>/
    def _test_menu_name(self):  ## error in this test, please correct its name and make it pass
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                            fat=1, image='./images/brownie.jpeg')

        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/menu/testmenu/')
        self.assertEqual(response.status_code, 401)

        ## if menu with name menuname does not exist, response should be 404
        response = client2.get('/api/menu/notamenu/')
        self.assertEqual(response.status_code, 404)

        ## correct response test
        response = client2.get('/api/menu/testmenu/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "name": "testmenu", "calories": 1, "carbs": 1, "protein": 1, "fat": 1, "image": "/images/brownie.jpeg"}', response.content.decode())


    ## test api/token/
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)

        response = client.post('/api/record/1/review/', {},
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response
        
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        
        response = client.post('/api/record/1/review/', {},
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)  # Pass csrf protection

        client = Client()
        response = client.post('/api/token/')
        self.assertEqual(response.status_code, 405)
        
    def test_signup(self):
        client = Client()
        response = client.post('/api/user/signup/', json.dumps({'username': 'chris', 'password': 'chris', 'age': 5, 'sex': True, 'height': 160, 'weight': 60, 'targetCalories': 2000 }), content_type='application/json')
        self.assertEqual(response.status_code, 201)  

    def test_signin(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client = Client()
        response = client.post('/api/user/signin/', json.dumps({'username': 'bang', 'password': 'testpassword'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/user/signin/', json.dumps({'username': 'testuser', 'password': 'testpassword'}), content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_signout(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client = Client()
        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 401)

        client.login(username='testuser', password='testpassword')
        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 204)

    def test_resign(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client = Client()
        response = client.delete('/api/user/resign/')
        self.assertEqual(response.status_code, 401)

        client.login(username='testuser', password='testpassword')
        response = client.delete('/api/user/resign/')
        self.assertEqual(response.status_code, 200)

    def test_profile(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        profile = Profile(user=user, age=1, sex=True, height=1, weight=1)
        profile.save()
        menu = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1, fat=1, image='./images/brownie.jpeg')
        menu.save()

        preference = Preference(user=user, ingredient="apple")
        preference.save()

        client = Client()
        response = client.get('/api/user/profile/')
        self.assertEqual(response.status_code, 401)
        response = client.put('/api/user/profile/', json.dumps({
            'username': 'bang',
            'age': '5',
            'sex': False,
            'height': '5',
            'weight': '5',
            'preference': ['testmenu'],
            'targetCalories': '5',
        }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        client.login(username='testuser', password='testpassword')
        response = client.get('/api/user/profile/')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/user/profile/', json.dumps({
            'username': 'bang',
            'age': '5',
            'sex': False,
            'height': '5',
            'weight': '5',
            'preference': ['testmenu'],
            'targetCalories': '5',
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/user/profile/', json.dumps({
            'username': 'bang',
            'age': '5',
            'sex': False,
            'height': '5',
            'weight': '5',
            'preference': ['chicken'],
            'targetCalories': '5',
        }), content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/user/profile/')
        self.assertEqual(response.status_code, 405)
    
    def test_nutrition_all(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        nutrition = UserNutrition(user=user, date=datetime.date(2021,11,11), calories=1, carbs=1, protein=1, fat=1)
        nutrition.save()

        nutrition = UserNutrition(user=user, date=datetime.date(2021,11,13), calories=1, carbs=1, protein=1, fat=1)
        nutrition.save()

        nutrition = UserNutrition(user=user, date=datetime.date(2021,11,9), calories=1, carbs=1, protein=1, fat=1)
        nutrition.save()

        client = Client()
        response = client.get('/api/nutrition/')
        self.assertEqual(response.status_code, 401)

        client.login(username='testuser', password='testpassword')
        response = client.get('/api/nutrition/')
        self.assertEqual(response.status_code, 200)
    
    def test_nutrition(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        nutrition = UserNutrition(user=user, date=datetime.date(2021,11,11), calories=1, carbs=1, protein=1, fat=1)
        nutrition.save()

        client = Client()
        response = client.get('/api/nutrition/2021-11-11/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/nutrition/2021-11-1/', json.dumps({
            "calories": 1, "carbs": 1, "protein": 1, "fat": 1, "count_all": 1
        }), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        response = client.put('/api/nutrition/2021-11-11/', json.dumps({
            "calories": 1, "carbs": 1, "protein": 1, "fat": 2, "count_all": 1
        }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        
        client.login(username='testuser', password='testpassword')
        response = client.get('/api/nutrition/2021-11-11/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/nutrition/2021-11-12/')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/nutrition/2021-11-12/', json.dumps({
            "calories": 1, "carbs": 1, "protein": 1, "fat": 1, "count_all": 1
        }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/nutrition/2021-11-1/', json.dumps({
            "calories": 1, "carbs": 1, "protein": 1, "fat": 1, "count_all": 1
        }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.put('/api/nutrition/2021-11-11/', json.dumps({
            "calories": 2, "carbs": 2, "protein": 2, "fat": 2, "count_all": 2
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.put('/api/nutrition/2021-11-10/', json.dumps({
            "calories": 2, "carbs": 2, "protein": 2, "fat": 2, "count_all": 2
        }), content_type='application/json')
        self.assertEqual(response.status_code, 404)
